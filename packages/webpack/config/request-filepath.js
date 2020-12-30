const fs = require("fs");

const exts = [".tsx", ".ts", ".jsx", ".js"];

function requestFilepath(request) {
  for (const ext of exts) {
    const p = request + ext;
    if (fs.existsSync(p)) {
      return p;
    }
  }

  return false;
}

module.exports = requestFilepath;
