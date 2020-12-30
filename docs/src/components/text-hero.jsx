import * as React from "react";
import cn from "classnames";

function TextHero({ className, title, details, small }) {
  return (
    <section className={cn("text-gray-700 body-font", className)}>
      <div
        className={cn(
          "container px-8 mx-auto lg:px-4",
          small ? "pt-12" : "pt-36"
        )}
      >
        <div className="flex flex-col w-full mx-auto mb-12 text-left lg:text-center">
          <h1
            className={cn(
              "mb-6 text-2xl font-semibold tracking-tighter text-blue-800 title-font",
              small ? "sm:text-3xl" : "sm:text-6xl"
            )}
          >
            {title}
          </h1>
          <p className="mx-auto text-base font-medium leading-relaxed text-gray-700">
            {details}
          </p>
        </div>
      </div>
    </section>
  );
}

export default TextHero;
