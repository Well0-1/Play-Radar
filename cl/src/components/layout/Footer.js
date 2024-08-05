import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  const email = "sakyuzogluh";
  const domain = "gmail.com";
  return (
    <div className="flex border-t justify-center px-20 py-6 w-full z-10 bg-red-900">
      <div className="flex flex-col w-full justify-between">
        <div className="max-lg:flex flex-col max-lg:items-center grid grid-cols-12 lg:space-y-0 space-y-6">
          <div className="max-lg:text-center max-lg:w-screen lg:col-span-6 relative">
            <a href="/" className="text-4xl font-bold">
              Can You Run It
            </a>
            <div className="flex flex-row max-lg:justify-center space-x-6 pt-2">
              <a
                href="https://www.github.com/Well0-1"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-slate-700 rounded-lg"
              >
                <FontAwesomeIcon icon={faGithub} size="xl" />
              </a>
              <a
                href="https://www.linkedin.com"
                rel="noopener noreferrer"
                className="p-2 hover:bg-slate-700 rounded-lg "
              >
                <FontAwesomeIcon icon={faLinkedin} size="xl" />
              </a>
              <a href={`mailto:${email}@${domain}`} className="p-2 hover:bg-slate-700 rounded-lg">
                <FontAwesomeIcon icon={faEnvelope} size="xl" />
              </a>
            </div>
          </div>
          <div className="max-lg:space-x-20 flex justify-between col-span-5">
            <div className="col-span-2 flex flex-col">
              <h1 className="text-2xl font-bold">Topic</h1>
              <div>
                <h1>subtitle</h1>
              </div>
            </div>
            <div className="col-span-2 flex flex-col">
              <h1 className="text-2xl font-bold">Topic</h1>
              <div>
                <h1>subtitle</h1>
              </div>
            </div>
            <div className="col-span-1 flex flex-col">
              <h1 className="text-2xl font-bold">Topic</h1>
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
