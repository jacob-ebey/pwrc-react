function pwrc(command, argv) {
  if (command === "build") {
    return require("./build")(argv);
  }
  if (command === "dev") {
    return require("./dev")(argv);
  }
}

module.exports = pwrc;
