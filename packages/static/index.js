const fs = require("fs");
const path = require("path");

const getHrefs = require("get-hrefs");

const prerender = require("@pwrc/prerender");
/**
 * @typedef {object} StaticOptions
 * @property {string} outdir
 * @property {string[]} paths
 */

/**
 * @param {StaticOptions} options
 */
async function pwrcStatic(options) {
  const { paths, outdir } = options;
  const maxRoutes = options.maxRoutes || 1000;
  const basename = options.basename || "";
  const followLinks = options.followLinks || false;

  const renderedRoutes = options.renderedRoutes || new Set();
  const render = async (routeI, initialRoute) => {
    const route = routeI || "/";
    if (renderedRoutes.has(route)) {
      return;
    }
    renderedRoutes.add(route);

    console.log("SSG: ", route);
    const { html } = await prerender(route, options);

    let filepath = route.startsWith("/") ? route.slice(1) : route;
    let filename = path.resolve(outdir, filepath);
    if (!filepath.endsWith(".html")) {
      await fs.promises.mkdir(filename, { recursive: true });

      filename = path.resolve(filename, "index.html");
    }

    await fs.promises.writeFile(filename, html, "utf-8");

    if (followLinks) {
      if (renderedRoutes.size >= maxRoutes) {
        return;
      }

      const hrefs = getHrefs(html);
      await Promise.all(
        hrefs.map(async (href) => {
          if (!href.startsWith("/")) {
            return;
          }

          await render(href.replace(basename, ""));
        })
      );
    }
  };

  await Promise.all(paths.map((p) => render(p, true)));
}

module.exports = pwrcStatic;
