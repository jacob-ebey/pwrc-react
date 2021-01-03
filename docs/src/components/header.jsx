import * as React from "react";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";

import GithubIcon from "./icons/github";

import global from "../../content/global";

function Header() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), [setOpen]);
  const toggleOpen = useCallback(() => setOpen(!open), [open, setOpen]);

  return (
    <header className="text-gray-700 bg-white border-t border-b body-font">
      <div className="container p-5 mx-auto flex items-center flex-row ">
        <Link
          to="/"
          onClick={close}
          className="flex items-center w-40 font-medium text-gray-900 title-font mb-0"
        >
          {global.siteName}
        </Link>
        <nav className="flex items-center justify-center ml-4 text-base">
          <Link
            to="/docs"
            onClick={close}
            className="mr-5 text-sm font-semibold text-gray-700 rounded-xl hover:text-gray-800"
          >
            Docs
          </Link>
          <Link
            to="/blog"
            onClick={close}
            className="mr-5 text-sm font-semibold text-gray-700 rounded-xl hover:text-gray-800"
          >
            Blog
          </Link>
        </nav>
        <button className="p-1 ml-auto rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
          <span className="sr-only">View notifications</span>

          <a
            aria-label="github icon"
            href="https://github.com/jacob-ebey/pwrc-react"
          >
            <GithubIcon className="w-6 h-6" />
          </a>
        </button>
      </div>
    </header>
  );
}

export default Header;
