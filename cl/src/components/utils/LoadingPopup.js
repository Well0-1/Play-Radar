import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { CircularProgress } from "@mui/material";

export default function LoadingPopUp({ visible, timeout, onClose, onError }) {
  if (timeout) {
    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center bg-gray-800 lg:w-1/2 lg:h-1/2 w-10/12 h-1/3 px-6 rounded-xl shadow-lg space-y-6">
          <FontAwesomeIcon icon={faTimes} size="4x" className="text-red-500" />
          <p className="text-3xl font-cairo font-semibold text-white">Something Went Wrong</p>
          <p className="lg:text-xl text-sm text-center font-cairo font-bold text-white">
            Would you like to send us your system information so that we can resolve this issue?
          </p>
          <div className="flex justify-between lg:w-2/3 space-x-4 w-full">
            <button className="bg-red-600 w-1/2 lg:p-4 p-2 rounded-md" onClick={onError}>
              Send System Info
            </button>
            <button className="bg-slate-600 w-1/2 lg:p-4 p-2 rounded-md" onClick={onClose}>
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
