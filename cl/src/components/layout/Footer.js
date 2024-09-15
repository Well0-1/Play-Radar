import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  const email = "sakyuzogluh";
  const domain = "gmail.com";
  return (
    <div className="flex border-t border-slate-700 justify-center p-8 w-full z-10 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
      <div className="flex flex-col w-full justify-between">
        <div className="grid grid-cols-12 lg:space-y-0 space-y-8 max-lg:flex max-lg:flex-col max-lg:items-center">
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
            <a
              href="/"
              className="text-4xl max-lg:pb-2 font-extrabold text-white font-cairo hover:text-slate-400 transition-colors duration-300"
            >
              Play-Radar
            </a>
            <div className="flex flex-row justify-center lg:justify-start space-x-6 pt-4">
              <a
                href="https://www.github.com/Well0-1"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:text-slate-400 transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faGithub} size="xl" />
              </a>
              <a
                href="https://www.linkedin.com/in/salih-aky%C3%BCzo%C4%9Flu-352359295/"
                rel="noopener noreferrer"
                className="p-2 hover:text-slate-400 transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faLinkedin} size="xl" />
              </a>
              <a
                href={`mailto:${email}@${domain}`}
                className="p-2 hover:text-slate-400 transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faEnvelope} size="xl" />
              </a>
            </div>
          </div>
          <div className="w-full lg:col-span-6 flex flex-row justify-between max-lg:space-x-12 text-white text-sm">
            <div className="flex flex-col space-y-2">
              <h1 className="text-xl font-semibold text-slate-300">Topic</h1>
              <a
                href="https://www.github.com/Well0-1"
                className="hover:text-slate-400 transition-colors duration-200"
              >
                Subtitle 1
              </a>
              <a
                href="https://www.github.com/Well0-1"
                className="hover:text-slate-400 transition-colors duration-200"
              >
                Subtitle 2
              </a>
            </div>
            <div className="flex flex-col space-y-2">
              <h1 className="text-xl font-semibold text-slate-300">Topic</h1>
              <a
                href="https://www.github.com/Well0-1"
                className="hover:text-slate-400 transition-colors duration-200"
              >
                Subtitle 1
              </a>
              <a
                href="https://www.github.com/Well0-1"
                className="hover:text-slate-400 transition-colors duration-200"
              >
                Subtitle 2
              </a>
            </div>
            <div className="flex flex-col space-y-2">
              <h1 className="text-xl font-semibold text-slate-300">Topic</h1>
              <a
                href="https://www.github.com/Well0-1"
                className="hover:text-slate-400 transition-colors duration-200"
              >
                Subtitle 1
              </a>
              <a
                href="https://www.github.com/Well0-1"
                className="hover:text-slate-400 transition-colors duration-200"
              >
                Subtitle 2
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
