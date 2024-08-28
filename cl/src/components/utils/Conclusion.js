import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

const Conclusion = ({ visible, status, issues, sysInfo }) => {
  if (!visible) return null;

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
      <h2 className="text-2xl font-bold text-center">System Check Conclusion</h2>
      <div className="space-y-4">
        {status ? (
          <div className="text-center">
            <FontAwesomeIcon icon={faCheck} size="3x" className="text-green-500" />
            <p className="text-green-400">Your system meets the minimum requirements!</p>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <FontAwesomeIcon icon={faTimes} size="3x" className="text-red-500" />
            <p className="text-red-400 font-semibold">
              Your system does not meet the minimum requirements!
            </p>
            <ul className="list-disc list-inside text-red-400">
              {issues.map((issue, index) => (
                <li key={index}>{issue}</li>
              ))}
            </ul>
            <div className="mt-6 space-y-2">
              <p className="text-gray-300 text-sm">
                If you believe there's an issue, share your system info with us, and we'll work
                together to resolve it
              </p>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded mt-2 transition-colors duration-200 hover:bg-blue-600"
                onClick={sysInfo}
              >
                Send System Info
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Conclusion;
