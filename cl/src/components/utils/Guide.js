import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad, faCheckCircle, faSyncAlt, faSmile } from "@fortawesome/free-solid-svg-icons";

export default function Guide({ first }) {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(true);

  const steps = [
    {
      title: "Welcome to Play Radar!",
      description:
        "Play Radar helps you check if your system can run games. We'll guide you step by step!",
      icon: faGamepad,
    },
    {
      title: "Check Compatibility",
      description:
        "We gather info about your system with our app and compare it with game requirements. Easy and fast!",
      icon: faCheckCircle,
    },
    {
      title: "Stay Updated",
      description:
        "Keep track of new games and get updates. We'll also suggest upgrades if needed!",
      icon: faSyncAlt,
    },
    {
      title: "Enjoy the Experience!",
      description:
        "Now you're ready! Search for games and make sure your system is always good to go!",
      icon: faSmile,
    },
  ];

  const handleClick = (index) => {
    if (index === steps.length - 1) {
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
