function updateMetaContent(html, name, content) {
  const safeContent = content
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;");

  return html.replace(/<meta\b[^>]*>/gi, (tag) => {
    const key = tag.match(/\b(?:property|name)\s*=\s*(["'])(.*?)\1/i)?.[2];
    if (key !== name) return tag;
    return tag.replace(/\bcontent\s*=\s*(["'])(.*?)\1/i, (_match, quote) => `content=${quote}${safeContent}${quote}`);
  });
}

async function withAbsoluteSocialUrls(response, requestUrl, canonicalPath) {
  if (!response.ok || !response.headers.get("content-type")?.includes("text/html")) {
    return response;
  }

  const html = await response.text();
  const imagePath = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i)?.[1];
  let updated = updateMetaContent(html, "og:url", new URL(canonicalPath, requestUrl.origin).href);

  if (imagePath) {
    const absoluteImage = new URL(imagePath, requestUrl.origin).href;
    updated = updateMetaContent(updated, "og:image", absoluteImage);
    updated = updateMetaContent(updated, "twitter:image", absoluteImage);
  }

  const headers = new Headers(response.headers);
  headers.delete("content-length");
  headers.delete("content-encoding");
  headers.delete("etag");
  return new Response(updated, { status: response.status, statusText: response.statusText, headers });
}

export default {
  async fetch(request, env) {
    const acceptsHtml = request.headers.get("accept")?.includes("text/html");
    const requestUrl = new URL(request.url);

    if (request.method === "GET" && acceptsHtml) {
      const route = requestUrl.pathname.replace(/\/+$/, "") || "/";
      const page = route === "/idila"
        ? { asset: "/idila/index.html", canonical: "/idila/" }
        : route === "/"
          ? { asset: "/index.html", canonical: "/" }
          : null;

      if (page) {
        const assetUrl = new URL(page.asset, requestUrl);
        const response = await env.ASSETS.fetch(new Request(assetUrl, {
          headers: { accept: "text/html" },
        }));
        return withAbsoluteSocialUrls(response, requestUrl, page.canonical);
      }
    }

    const response = await env.ASSETS.fetch(request);

    if (response.status !== 404 || !acceptsHtml || !["GET", "HEAD"].includes(request.method)) {
      return response;
    }

    const indexUrl = new URL(request.url);
    indexUrl.pathname = "/index.html";
    indexUrl.search = "";
    return env.ASSETS.fetch(new Request(indexUrl, request));
  },
};
