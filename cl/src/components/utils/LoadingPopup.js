import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { CircularProgress } from "@mui/material";

export default function LoadingPopUp({ visible, systemData, onClose }) {
  if (systemData) {
    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center font-cairo">
        <div className="flex flex-col items-center justify-center bg-gray-900 lg:w-3/5 w-10/12 h-fit p-8 rounded-2xl shadow-2xl lg:space-y-8 space-y-4 transform transition-all duration-300 ease-in-out">
          <FontAwesomeIcon
            icon={faDownload}
            size="4x"
            className="text-blue-400 animate-bounce size-10 lg:size-16"
          />
          <p className="lg:text-3xl  font-semibold text-white text-center">
            It looks like you haven't run our app yet
          </p>
          <p className="lg:text-lg text-xs text-center font-light text-gray-300 leading-relaxed">
            To automatically fill in your system information, please follow these steps:
          </p>
          <ol className="list-decimal space-y-4 text-left px-4 lg:px-0 lg:text-base text-xs">
            <li>Download our app from the button below.</li>
            <li>
              Run it and grant the necessary permissions. Once you see the message "Your system data
              has been successfully gathered," you can close or delete the app.
            </li>
          </ol>
          <div className="border-l-4 border-blue-400 bg-gray-800 p-4 rounded-lg w-full lg:text-base text-xs">
            <p className="font-semibold">
              The app is fully secure. Learn more about how it works{" "}
              <a
                href="/howitworks"
                className="text-blue-400 hover:text-blue-500 transition-colors duration-300"
              >
                here
              </a>
              , or check the source code on{" "}
              <a
                href="https://github.com/Well0-1/Play-Radar/tree/master/app"
                className="text-blue-400 hover:text-blue-500 transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              .
            </p>
          </div>
          <div className="border-l-4 border-blue-400 bg-gray-800 p-4 rounded-lg w-full lg:text-base text-xs">
            <p className="font-semibold">
              While the application is running, the site must be open!
            </p>
            <p className="font-semibold">
              After running it once, you will be able to use auto-fill anytime.
            </p>
          </div>
          <div className="flex justify-between w-full space-x-4 lg:text-base text-xs">
            <a
              className="bg-blue-600 hover:bg-blue-700 text-center transition-all duration-300 ease-in-out text-white w-full lg:p-4 p-3 rounded-lg shadow-xl font-semibold"
              href="https://www.mediafire.com/file/613q5bzhb45gbfk/playRadar-x64.rar/file"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download App
            </a>
            <button
              className="bg-gray-600 hover:bg-gray-700 transition-all duration-300 ease-in-out text-white w-full lg:p-4 p-3 rounded-lg shadow-xl font-semibold"
              onClick={onClose}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (visible) {
    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
        <div className="flex lg:flex-row flex-col items-center justify-center bg-gray-800  lg:w-1/2 lg:h-1/2 w-10/12 h-1/3 px-6  rounded-xl shadow-lg lg:space-y-0 space-y-6">
          <p className="lg:text-3xl text-xl font-cairo font-semibold text-white">
            Sistem Bilgileri Toplanıyor...
          </p>
          <CircularProgress size={30} sx={{ color: "gray", marginX: 2 }} />
        </div>
      </div>
    );
  }

  return null;
}
