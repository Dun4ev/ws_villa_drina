#!/usr/bin/env node
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const index = path.join(dist, "client", "index.html");
const worker = path.join(root, "worker", "index.js");
const hosting = path.join(root, ".openai", "hosting.json");

function netlifyOrigin() {
  const configuredUrl = process.env.CONTEXT === "production"
    ? process.env.URL
    : process.env.DEPLOY_PRIME_URL || process.env.URL;

  if (!configuredUrl) return null;
  try {
    return new URL(configuredUrl).origin;
  } catch {
    return null;
  }
}

function updateMetaContent(html, key, value) {
  const safeValue = value.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
  return html.replace(/<meta\b[^>]*>/gi, (tag) => {
    const name = tag.match(/\b(?:property|name)\s*=\s*(["'])(.*?)\1/i)?.[2];
    if (name !== key) return tag;
    return tag.replace(/\bcontent\s*=\s*(["'])(.*?)\1/i, (_match, quote) => `content=${quote}${safeValue}${quote}`);
  });
}

function makeSocialUrlsAbsolute(file, route) {
  const origin = netlifyOrigin();
  if (!origin) return;

  const filePath = path.join(dist, "client", file);
  let html = readFileSync(filePath, "utf8");
  const imagePath = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i)?.[1];
  if (!imagePath) return;

  html = updateMetaContent(html, "og:url", new URL(route, origin).href);
  const imageUrl = new URL(imagePath, origin).href;
  html = updateMetaContent(html, "og:image", imageUrl);
  html = updateMetaContent(html, "twitter:image", imageUrl);
  writeFileSync(filePath, html);
}

for (const file of [index, worker, hosting]) {
  if (!existsSync(file)) throw new Error("Missing Sites build input: " + file);
}

makeSocialUrlsAbsolute("index.html", "/");
makeSocialUrlsAbsolute("idila/index.html", "/idila/");

mkdirSync(path.join(dist, "server"), { recursive: true });
mkdirSync(path.join(dist, ".openai"), { recursive: true });
copyFileSync(worker, path.join(dist, "server", "index.js"));
copyFileSync(hosting, path.join(dist, ".openai", "hosting.json"));

console.log("Prepared Sites build: dist/server/index.js and dist/.openai/hosting.json");
