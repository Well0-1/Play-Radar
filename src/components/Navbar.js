import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Navbar() {
  return (
    <div className="flex items-center justify-center w-screen bg-orange-600 p-8 z-10">
      <div className="flex justify-between w-full lg:w-[1024px]">
        <div className="p-2 flex items-center">
          <h1 className="text-2xl font-bold tracking-wide">canYouRunIt</h1>
        </div>
        <div className="p-2 space-x-8 text-sm flex items-center">
          <a href="/howitworks" className="font-semibold">
            How It Works?
          </a>
          <a href="https://www.github.com/Well0-1">
            <FontAwesomeIcon icon={faGithub} size="xl" />
          </a>
        </div>
      </div>
    </div>
  );
}
