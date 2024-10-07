import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad, faCheckCircle, faSmile, faTrophy } from "@fortawesome/free-solid-svg-icons";

export default function Guide({ first }) {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(true);

  const steps = [
    {
      title: "Welcome to Play Radar!",
      description:
        "Your gateway to finding games that run perfectly on your system. Let us guide you to an optimized gaming experience.",
      icon: faGamepad,
    },
    {
      title: "System Compatibility Check",
      description:
        "Quickly assess your system's specifications with our app and match them against game requirements. Seamless and accurate!",
      icon: faCheckCircle,
    },
    {
      title: "Game On!",
      description:
        "Get personalized game suggestions that match your system’s capabilities and stay up to date with the latest releases.",
      icon: faTrophy,
    },
    {
      title: "Now You're Ready!",
      description:
        "Start exploring, search for games with peace of mind, knowing your system is optimized for the best performance. Play without limits!",
      icon: faSmile,
    },
  ];

  const handleClick = (index) => {
    if (index === steps.length - 1) {
      localStorage.setItem("showGuide", "true");
      setVisible(false);
    } else {
      setStep(index + 1);
    }
  };

  if (!first || !visible) return null;

  if (visible)
    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center font-cairo">
        <div className="flex flex-col items-center justify-center bg-gray-800 lg:w-3/5 w-10/12 h-1/2 p-6 rounded-2xl shadow-2xl space-y-8 transform transition-all duration-300 ease-in-out">
          <FontAwesomeIcon icon={steps[step].icon} className="text-4xl text-blue-400" />
          <h2 className="text-3xl font-bold text-white">{steps[step].title}</h2>
          <p className="text-lg text-gray-300 text-center">{steps[step].description}</p>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => handleClick(step)}
          >
            {step >= steps.length - 1 ? "Start Using Play Radar" : "Next"}
          </button>
        </div>
      </div>
    );
}
