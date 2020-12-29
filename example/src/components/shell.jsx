import * as React from "react";

import Header from "./header";

function Shell({ children, toggleCart }) {
  return (
    <div className="antialiased bg-white">
      <Header onCartToggled={toggleCart} />
      {children}
    </div>
  );
}

export default Shell;
