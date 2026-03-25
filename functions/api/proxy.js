export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const target = url.searchParams.get("url");

  if (!target) {
    return new Response("Missing 'url' parameter", { status: 400 });
  }

  // Only allow fetching from GEBA domain
  const allowed = ["www.futbolmayores.geba.org.ar"];
  let targetUrl;
  try {
    targetUrl = new URL(target);
  } catch {
    return new Response("Invalid URL", { status: 400 });
  }

  if (!allowed.includes(targetUrl.hostname)) {
    return new Response("Domain not allowed", { status: 403 });
  }

  try {
    const resp = await fetch(target, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    const body = await resp.text();

    return new Response(body, {
      status: resp.status,
      headers: {
        "Content-Type": resp.headers.get("Content-Type") || "text/html",
        "Access-Control-Allow-Origin": url.origin,
        "Cache-Control": "no-store",
      },
    });
  } catch (e) {
    return new Response("Fetch failed: " + e.message, { status: 502 });
  }
}
