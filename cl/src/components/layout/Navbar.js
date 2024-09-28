import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Navbar() {
  return (
    <div className="flex items-center justify-center w-screen bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 lg:p-8 p-4 z-10 shadow-lg">
      <div className="flex justify-between w-full lg:w-[1024px] max-w-screen-xl mx-auto">
        <div className="flex items-center">
          <a
            href="/"
            className="text-3xl font-extrabold tracking-wide text-white font-cairo hover:text-slate-400 transition-colors duration-300"
          >
            Play-Radar
          </a>
        </div>
        <div className="flex items-center space-x-4 lg:space-x-8 text-sm lg:text-base">
          <a
            href="/howitworks"
            className="text-white font-semibold hover:text-slate-400 transition-all duration-300"
          >
            How It Works?
          </a>
          <a
            href="https://github.com/Well0-1/Play-Radar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white p-2 hover:text-slate-400 transition-colors duration-200"
          >
            <FontAwesomeIcon icon={faGithub} size="xl" />
          </a>
        </div>
      </div>
    </div>
  );
}
