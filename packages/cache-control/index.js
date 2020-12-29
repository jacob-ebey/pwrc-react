const { createContext, useContext } = require("react");

const CONTEXT = createContext({});

function useCacheControl(maxAge) {
  const ctx = useContext(CONTEXT);

  if (typeof ctx.maxAge === "undefined") {
    ctx.maxAge = maxAge;
  } else if (maxAge < ctx.maxAge) {
    ctx.maxAge = maxAge;
  }
}

useCacheControl.Context = CONTEXT;

module.exports = useCacheControl;
