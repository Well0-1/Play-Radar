import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar() {
  return (
    <div className="w-full flex lg:justify-between p-1">
      <div className="flex items-center justify-center max-lg:hidden pl-5">
        <strong>Popular Games</strong>
      </div>
      <div className="flex items-center max-lg:w-full w-2/5">
        <label htmlFor="search" className="p-4 absolute select-none">
          <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
        </label>
        <input
          name="search"
          className="p-4 pl-12 pr-0 max-lg:w-full w-full rounded-sm"
          placeholder="Find Your Game"
          autoComplete="off"
        />
      </div>
    </div>
  );
}
