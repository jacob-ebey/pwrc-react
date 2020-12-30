import { createResourceFactory } from "react-lazy-data";

const context = require.context("../../blog", false, /\.md$/, "lazy");

function getDate(request) {
  const str = request.replace(/^\.\//, "").split("--")[0];
  const [year, month, day] = str.split("-");
  return new Date(
    Number.parseInt(year),
    Number.parseInt(month) - 1,
    Number.parseInt(day)
  );
}

function getSlug(request) {
  return request.replace(/^\.\//, "").replace(/\.md$/, "");
}

const BlogPostsResource = createResourceFactory(
  (limit) => {
    const formatPromise = import("date-fns/format").then((m) => m.default);

    const keys = context.keys();
    /** @type {string[]} */
    const sorted = keys.sort((a, b) => getDate(b) - getDate(a));

    const limited = sorted.slice(0, limit);

    return Promise.all(
      sorted.map(async (request) => {
        const [format, frontmatter] = await Promise.all([
          formatPromise,
          context(request),
        ]);

        const date = format(getDate(request), "MM/dd/yyy");
        const slug = getSlug(request);

        return {
          ...frontmatter.attributes,
          slug,
          date,
        };
      })
    );
  },
  { id: "blog-posts" }
);

export default BlogPostsResource;
