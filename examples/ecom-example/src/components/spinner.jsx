import * as React from "react";
import cn from "classnames";

function Spinner({ className }) {
  return (
    <div className={cn("flex justify-center items-center", className)}>
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
}

export default Spinner;
