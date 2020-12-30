import path from "path";
import { promisify } from "util";

import fetch from "cross-fetch";
import globCB from "glob";

import static from "@pwrc/static";

const glob = promisify(globCB);

const providedPaths = process.argv.slice(2);

(async () => {
  let paths = providedPaths.length > 0 ? providedPaths : false;

  if (!paths) {
    paths = ["/", "/about", "/404.html"];

    const posts = await glob("*.md", {
      cwd: path.resolve(process.cwd(), "blog"),
    });

    posts.forEach((post) => paths.push(`/post/${post.replace(/\.md/, "")}`));
  }

  static({
    paths,
    outdir: path.resolve(process.cwd(), "public"),
    basename: BASE_PATH,
    followLinks: true,
  });
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
