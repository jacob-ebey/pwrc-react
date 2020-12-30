const prerender = require("@pwrc/prerender");

const basePath = BASE_PATH;

/**
 * @typedef {object} PWRCVercelOptions
 * @property {string[]} scripts
 * @property {string[]} styles
 */

/**
 * @param {PWRCVercelOptions} options
 */

function pwrcVercel(options) {
  /**
   *
   * @param {import("@vercel/node").NowRequest} req
   * @param {import("@vercel/node").NowResponse} res
   */
  async function pwrcVercelHandler(req, res) {
    try {
      let path = req.url;
      if (basePath) {
        path = path.replace(`/^\\/${basePath}`, "");
      }
      if (path.length > 1 && path.endsWith("/")) {
        path = path.slice(0, -1);
      }

      const { html, maxAge } = await prerender(path, options);
      res.setHeader("Content-Type", "text/html; charset=UTF-8");
      res.setHeader(
        "Cache-Control",
        `public, max-age=${maxAge}, stale-while-revalidate`
      );

      res.write(html);
      res.end();
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }

  return pwrcVercelHandler;
}

module.exports = pwrcVercel;
