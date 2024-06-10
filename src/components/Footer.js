import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <div className="flex border-t justify-center px-20 py-6 w-full z-10 bg-red-900">
      <div className="flex flex-col w-full justify-between">
        <div className="max-lg:flex flex-col max-lg:items-center grid grid-cols-12 lg:space-y-0 space-y-8">
          <div className="col-span-2 lg:col-span-6 relative">
            <a href="/" className="text-4xl align-middle">
              Can You Run It
            </a>
            <div className="flex flex-row max-lg:justify-center">
              <a href="https://www.github.com/Well0-1" className="p-6 pl-0 z-50 ">
                <FontAwesomeIcon icon="faGithub" />
                {/* Fontawesome Çözülecek main Part tamamlanacak! */}
              </a>
              <a className="p-6 z-50 " href="https://www.linkedin.com">
                <FontAwesomeIcon icon="faLinkedin" />
              </a>
            </div>
          </div>
          <div className="max-lg:space-x-20 flex justify-between col-span-5">
            <div className="col-span-2 flex flex-col">
              <h1 className="text-2xl">Topic</h1>
              <div>
                <h1>subtitle</h1>
              </div>
            </div>
            <div className="col-span-2 flex flex-col">
              <h1 className="text-2xl">Topic</h1>
              <div>
                <h1>subtitle</h1>
              </div>
            </div>
            <div className="col-span-1 flex flex-col">
              <h1 className="text-2xl">Topic</h1>
              <div>
                <h1>subtitle</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
