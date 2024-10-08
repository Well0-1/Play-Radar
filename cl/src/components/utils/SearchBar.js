import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar({ onSearch }) {
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <div className="flex px-2 pt-3 items-center w-full relative">
      <label
        htmlFor="search"
        className={`p-4 absolute transition-colors duration-500 ${
          isFocused ? "text-slate-400" : "text-gray-500"
        }`}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
      </label>
      <input
        id="search"
        name="search"
        className="p-4 pl-12 pr-4 w-full rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-500"
        placeholder="Search games..."
        autoComplete="off"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
}
