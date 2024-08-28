import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

const Conclusion = ({ visible, status, issues }) => {
  if (!visible) return null;

  const isValid = status === true;

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
      <h2 className="text-2xl font-bold text-center">System Check Conclusion</h2>
      <div className="space-y-4">
        {isValid ? (
          <div className="text-center">
            <FontAwesomeIcon icon={faCheck} size="3x" className="text-green-500" />
            <p className="text-green-400">Your system meets the minimum requirements!</p>
          </div>
        ) : (
          <div className="text-center space-y-4 ">
            <FontAwesomeIcon icon={faTimes} size="3x" className="text-red-500" />
            <p className="text-red-400">Your system does not meet the minimum requirements:</p>
            <ul className="list-disc list-inside text-red-400">
              {issues.map((issue, index) => (
                <li key={index}>{issue}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Conclusion;
