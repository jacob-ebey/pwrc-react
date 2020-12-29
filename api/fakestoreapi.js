const fetch = require("cross-fetch");

/**
 * @param {import("@vercel/node").NowRequest} req
 * @param {import("@vercel/node").NowResponse} res
 */
async function fakeStoreApi(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    let path = req.url;
    if (path.length > 1 && path.endsWith("/")) {
      path = path.slice(0, -1);
    }

    const apiRes = await fetch(
      `https://fakestoreapi.com${path.replace("/api/fakestoreapi/", "/")}`
    );
    if (apiRes.status === 200 && req.method.toLowerCase() === "get") {
      res.setHeader(
        "Cache-Control",
        `public, max-age=300, stale-while-revalidate`
      );
    }

    res.status(apiRes.status).send(await apiRes.text());
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
}

module.exports = fakeStoreApi;
