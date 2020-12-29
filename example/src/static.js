import path from "path";

import fetch from "cross-fetch";

import static from "@pwrc/static";

const providedPaths = process.argv.slice(2);
const paths =
  providedPaths.length > 0 ? providedPaths : ["/", "/about", "/404.html"];

const renderedRoutes = new Set();

const promises = [
  static({
    paths,
    outdir: path.resolve(process.cwd(), "public"),
    basename: BASE_PATH,
    followLinks: providedPaths.length === 0,
    renderedRoutes,
  }),
];

if (providedPaths.length === 0) {
  promises.push(
    fetch(
      "https://pwrc-react.vercel.app/api/fakestoreapi/products/category/women clothing"
    )
      .then((r) => r.json())
      .then((products) => {
        const catPaths = products.map((p) => `/pdp/${p.id}`);

        return static({
          paths: catPaths,
          outdir: path.resolve(process.cwd(), "public"),
          basename: BASE_PATH,
          followLinks: true,
          renderedRoutes,
        });
      })
  );

  promises.push(
    fetch(
      "https://pwrc-react.vercel.app/api/fakestoreapi/products/category/men clothing"
    )
      .then((r) => r.json())
      .then((products) => {
        const catPaths = products.map((p) => `/pdp/${p.id}`);

        return static({
          paths: catPaths,
          outdir: path.resolve(process.cwd(), "public"),
          basename: BASE_PATH,
          followLinks: true,
          renderedRoutes,
        });
      })
  );
}

Promise.all(promises).catch((error) => {
  console.error(error);
  process.exit(1);
});
