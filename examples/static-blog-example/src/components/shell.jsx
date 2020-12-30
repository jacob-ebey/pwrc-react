import * as React from "react";

import Header from "./header";

function Shell({ children }) {
  return (
    <div className="antialiased bg-white">
      <Header />
      {children}
    </div>
  );
}

export default Shell;
