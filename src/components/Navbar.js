import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Navbar() {
  return (
    <div className="flex items-center justify-center w-screen bg-orange-600 lg:p-8 p-4 z-10">
      <div className="flex justify-between w-full lg:w-[1024px]">
        <div className="p-2 flex items-center">
          <a href="/" className="text-2xl font-bold tracking-wide">
            canYouRunIt
          </a>
        </div>
        <div className="p-2 space-x-2 lg:space-x-6 text-sm flex items-center text-center">
          <a href="/howitworks" className="font-semibold">
            How It Works?
          </a>
          <a href="https://www.github.com/Well0-1" className="hover:bg-slate-600 p-2 rounded-lg">
            <FontAwesomeIcon icon={faGithub} size="2xl" />
          </a>
        </div>
      </div>
    </div>
  );
}
