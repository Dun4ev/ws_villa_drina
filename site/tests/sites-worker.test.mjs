import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import worker from "../worker/index.js";

test("serves existing static assets without a fallback", async () => {
  const calls = [];
  const response = await worker.fetch(new Request("https://example.test/assets/app.js"), {
    ASSETS: {
      fetch: async (request) => {
        calls.push(new URL(request.url).pathname);
        return new Response("asset", { status: 200 });
      },
    },
  });

  assert.equal(response.status, 200);
  assert.deepEqual(calls, ["/assets/app.js"]);
});

test("falls back to index.html for an unknown app route", async () => {
  const calls = [];
  const response = await worker.fetch(
    new Request("https://example.test/flow/step-two?source=share", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async (request) => {
          const url = new URL(request.url);
          calls.push(url.pathname + url.search);
          return new Response(url.pathname === "/index.html" ? "app" : "missing", {
            status: url.pathname === "/index.html" ? 200 : 404,
          });
        },
      },
    },
  );

  assert.equal(response.status, 200);
  assert.deepEqual(calls, ["/flow/step-two?source=share", "/index.html"]);
});

test("returns route-specific social metadata before client JavaScript runs", async () => {
  const calls = [];
  const html = `<!doctype html><html><head>
    <meta name="robots" content="noindex, nofollow" />
    <meta property="og:title" content="Idila Zaovinskog jezera" />
    <meta property="og:description" content="Kuća na Tari." />
    <meta property="og:url" content="/idila/" />
    <meta property="og:image" content="/images/idila-social.jpg" />
    <meta name="twitter:image" content="/images/idila-social.jpg" />
    </head><body><div id="root"></div></body></html>`;
  const response = await worker.fetch(
    new Request("https://villa.example/idila/?lang=en", { headers: { accept: "text/html" } }),
    {
      ASSETS: {
        fetch: async (request) => {
          calls.push(new URL(request.url).pathname);
          return new Response(html, { headers: { "content-type": "text/html; charset=utf-8" } });
        },
      },
    },
  );

  const body = await response.text();
  assert.equal(response.status, 200);
  assert.deepEqual(calls, ["/idila/index.html"]);
  assert.match(body, /property="og:title" content="Idila Zaovinskog jezera"/);
  assert.match(body, /property="og:url" content="https:\/\/villa\.example\/idila\/"/);
  assert.match(body, /property="og:image" content="https:\/\/villa\.example\/images\/idila-social\.jpg"/);
  assert.match(body, /name="twitter:image" content="https:\/\/villa\.example\/images\/idila-social\.jpg"/);
  assert.match(body, /name="robots" content="noindex, nofollow"/);
});

test("does not turn missing API or write requests into the app shell", async () => {
  for (const request of [
    new Request("https://example.test/api/missing", { headers: { accept: "application/json" } }),
    new Request("https://example.test/flow", { method: "POST", headers: { accept: "text/html" } }),
  ]) {
    let calls = 0;
    const response = await worker.fetch(request, {
      ASSETS: {
        fetch: async () => {
          calls += 1;
          return new Response("missing", { status: 404 });
        },
      },
    });

    assert.equal(response.status, 404);
    assert.equal(calls, 1);
  }
});

test("emits the files required by Sites packaging", async () => {
  await access(new URL("../dist/client/index.html", import.meta.url));
  await access(new URL("../dist/server/index.js", import.meta.url));
  await access(new URL("../dist/.openai/hosting.json", import.meta.url));
});

test("builds separate noindex social metadata documents and preview images", async () => {
  const dist = new URL("../dist/client/", import.meta.url);
  const drina = await readFile(new URL("index.html", dist), "utf8");
  const idila = await readFile(new URL("idila/index.html", dist), "utf8");

  assert.match(drina, /<title>Drina Lux \| Odmor na obali Drine<\/title>/);
  assert.match(drina, /property="og:image" content="(?:https?:\/\/[^"/]+)?\/images\/drina-lux-social\.jpg"/);
  assert.match(drina, /name="robots" content="noindex, nofollow"/);
  assert.match(idila, /<title>Idila Zaovinskog jezera \| Kuća za odmor na Tari<\/title>/);
  assert.match(idila, /property="og:image" content="(?:https?:\/\/[^"/]+)?\/images\/idila-social\.jpg"/);
  assert.match(idila, /name="robots" content="noindex, nofollow"/);
  assert.doesNotMatch(idila, /Drina Lux \| Odmor na obali Drine/);

  await access(new URL("images/drina-lux-social.jpg", dist));
  await access(new URL("images/idila-social.jpg", dist));
});
