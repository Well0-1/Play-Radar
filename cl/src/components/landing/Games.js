import React, { useState, useRef } from "react";
import axios from "axios";
import cpuData from "../data/cpu_data.json";
import gpuData from "../data/gpu_data.json";
import LoadingPopup from "../utils/LoadingPopup.js";
import { getBenchmarkScore } from "../utils/getBenchmarkScore.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, LogarithmicScale, Tooltip, Legend);

export default function Games() {
  const [cpuModel, setCpuModel] = useState("");
  const [gpuModel, setGpuModel] = useState("");
  const [ram, setRam] = useState("");
  const [os, setOs] = useState("");
  const [bit, setBit] = useState("");
  const [freeSpace, setFreeSpace] = useState();
  const [cpuSuggestions, setCpuSuggestions] = useState([]);
  const [gpuSuggestions, setGpuSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [timeoutStat, setTimeoutStat] = useState(false);
  const cpuInputRef = useRef(null);
  const gpuInputRef = useRef(null);
  const cpuSuggestionsRef = useRef(null);
  const gpuSuggestionsRef = useRef(null);

  const handleInputChange = (e, setState, setSuggestions, data) => {
    const { value } = e.target;
    setSuggestionIndex(0);
    setState(value);

    const matches = data.filter((model) => model.model.toLowerCase().includes(value.toLowerCase()));

    setSuggestions(matches.slice(0, 5).map((match) => match.model));
  };

  const handleSuggestionClick = (suggestion, type) => {
    if (type === "cpu") {
      setCpuModel(suggestion);
      setCpuSuggestions([]);
    } else if (type === "gpu") {
      setGpuModel(suggestion);
      setGpuSuggestions([]);
    }
  };

  const handleKeyDown = (e, suggestions, handleSuggestionClick, type) => {
    if (e.key === "Tab") {
      e.preventDefault();
      setSuggestionIndex((prevIndex) => (prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0));
    } else if (e.key === "Enter" && suggestionIndex !== -1) {
      handleSuggestionClick(suggestions[suggestionIndex], type);
      setSuggestionIndex(-1);
    }
  };

  const handleBlur = (type, event) => {
    const inputValue = type === "cpu" ? cpuModel : gpuModel;

    if (inputValue.trim() === "") {
      if (type === "cpu") {
        setCpuSuggestions([]);
      } else if (type === "gpu") {
        setGpuSuggestions([]);
      }
      return;
    }

    const suggestionsRef = type === "cpu" ? cpuSuggestionsRef : gpuSuggestionsRef;
    const isOutsideClick =
      suggestionsRef.current && !suggestionsRef.current.contains(event.relatedTarget);

    if (isOutsideClick) {
      if (type === "cpu") {
        setCpuSuggestions([]);
      } else if (type === "gpu") {
        setGpuSuggestions([]);
      }
    }
  };

  const handleAutoFill = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api");
      setCpuModel(data.cpuModel);
      setGpuModel(data.gpuModel);
      setRam(data.ramGB);
      setOs(data.userOs);
      setBit(data.bit);
      setFreeSpace(data.freeSpace);
      setLoading(false);
      setTimeoutStat(true);
    } catch (err) {
      setTimeout(() => {
        setLoading(false);
        setTimeoutStat(true);
      }, 2000);
    }
  };

  const sendSysInfo = async () => {
    try {
      await axios.post("/system-info", {
        cpu: cpuModel,
        gpu: gpuModel,
        ram: ram,
        os: os,
        bit: bit,
      });
      alert("Successfully Deployed");
      popupClose();
    } catch (err) {
      console.log("Sorry Something Went Wrong");
    }
  };

  const popupClose = () => {
    if (loading) {
      setLoading(false);
    } else {
      setTimeoutStat(false);
    }
  };

  const checkBit = () => {
    return bit === game.minRequirements.bit || bit === "x64";
  };

  const checkOs = () => {
    const v = parseInt(os.slice(-2).trim());
    return os.toLowerCase().includes("windows") && v >= 8;
  };

  const game = {
    title: "Mafia: Definitive Edition",
    company: "Hangar 13",
    releaseDate: "2020-09-15",
    imageUrl:
      "https://cdn1.epicgames.com/ee8802651a004c48999169fa32eb4903/offer/EGS_MafiaDefinitiveEditionPreOrder_Hangar13_G1A_00-1920x1080-268b01e611aa17de8caedd662b8462ab.jpg",
    minRequirements: {
      os: "Windows 10 64-bit",
      cpu: "Intel Core i3-560 @ 3.33GHz",
      ram: 6,
      gpu: "GeForce GTX 460",
      bit: 64,
    },
    recRequirements: {
      os: "Windows 10 64-bit",
      cpu: "Intel Core i5-2500 @ 3.30GHz",
      ram: 8,
      gpu: "GeForce GTX 670",
    },
  };

  const data = {
    labels: ["CPU", "GPU", "Ram"],
    datasets: [
      {
        label: "Minimum Requirements",
        data: [
          getBenchmarkScore(game.minRequirements.cpu, cpuData),
          getBenchmarkScore(game.minRequirements.gpu, gpuData),
          game.minRequirements.ram,
        ],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
      {
        label: "Recommended Requirements",
        data: [
          getBenchmarkScore(game.recRequirements.cpu, cpuData),
          getBenchmarkScore(game.recRequirements.gpu, gpuData),
          game.recRequirements.ram,
        ],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Your System",
        data: [getBenchmarkScore(cpuModel, cpuData), getBenchmarkScore(gpuModel, gpuData), ram],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 14,
          },
          color: "rgba(255, 255, 255, 1)",
        },
      },
      y: {
        type: "logarithmic",
        display: false,
        ticks: {
          font: {
            size: 14,
          },
          color: "rgba(255, 255, 255, 1)",
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 text-white p-6">
      <div className={`${loading || timeoutStat ? "blur-sm" : "blur-0"}`}>
        {/* Game Title and Release Information */}
        <div className="text-center mb-10">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-wide">{game.title}</h1>
          <p className="text-gray-400 mt-2">
            {game.company} - {game.releaseDate}
          </p>
        </div>

        {/* Game Cover Image */}
        <div className="flex justify-center mb-12">
          <img
            src={game.imageUrl}
            alt={`${game.title} Cover`}
            className="max-w-full lg:max-w-4xl rounded-xl object-cover shadow-lg"
          />
        </div>

        {/* System Requirements Sections */}
        <div className="flex flex-col lg:flex-row justify-between lg:space-x-8 mb-12">
          <section className="flex-1 bg-slate-700 p-6 rounded-lg shadow-lg border border-slate-600 hover:bg-slate-600 transition duration-300 mb-8 lg:mb-0">
            <h2 className="text-2xl lg:text-3xl text-center lg:text-start font-bold pb-4">
              Minimum System Requirements
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-300 font-inter">
              <li>Operating System: {game.minRequirements.os}</li>
              <li>Processor: {game.minRequirements.cpu}</li>
              <li>Memory: {game.minRequirements.ram} GB</li>
              <li>Graphics: {game.minRequirements.gpu}</li>
            </ul>
          </section>

          <section className="flex-1 bg-slate-700 p-6 rounded-lg shadow-lg border border-slate-600 hover:bg-slate-600 transition duration-300">
            <h2 className="text-2xl lg:text-3xl text-center lg:text-start font-bold pb-4">
              Recommended System Requirements
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-300 font-inter">
              <li>Operating System: {game.recRequirements.os}</li>
              <li>Processor: {game.recRequirements.cpu}</li>
              <li>Memory: {game.recRequirements.ram} GB</li>
              <li>Graphics: {game.recRequirements.gpu}</li>
            </ul>
          </section>
        </div>

        {/* Comparison Section */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-center mb-6">
            Your System vs Game Requirements
          </h2>
          <div className="w-full lg:w-2/3 h-64 mx-auto mb-6">
            <Bar data={data} options={options} />
          </div>
          <h5 className="text-xs font-extralight text-slate-400 text-center mb-6">
            -____________________________________________________-
          </h5>
          <div className="space-y-4">
            <h3 className="text-xl lg:text-2xl font-semibold">Your System Info</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <strong>CPU:</strong>
                <input
                  type="text"
                  value={cpuModel}
                  className="bg-slate-800 p-2 rounded-md w-full text-white"
                  onChange={(e) => handleInputChange(e, setCpuModel, setCpuSuggestions, cpuData)}
                  onFocus={() =>
                    handleInputChange(
                      { target: { value: cpuModel } },
                      setCpuModel,
                      setCpuSuggestions,
                      cpuData
                    )
                  }
                  onKeyDown={(e) => handleKeyDown(e, cpuSuggestions, handleSuggestionClick, "cpu")}
                  onBlur={(e) => handleBlur("cpu", e)}
                  ref={cpuInputRef}
                />
              </li>
              {cpuSuggestions.length > 0 && (
                <ul
                  className="bg-slate-700 p-2 rounded-md mt-2"
                  ref={cpuSuggestionsRef}
                  tabIndex={-1}
                  onBlur={(e) => handleBlur("cpu", e)}
                >
                  {cpuSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className={`text-white cursor-pointer outline-none p-0.5 rounded-sm ${
                        index === suggestionIndex ? "bg-blue-600" : ""
                      }`}
                      onClick={() => handleSuggestionClick(suggestion, "cpu")}
                      onKeyDown={(e) =>
                        handleKeyDown(e, cpuSuggestions, handleSuggestionClick, "cpu")
                      }
                      tabIndex={0}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
              <li>
                <strong>GPU:</strong>
                <input
                  type="text"
                  value={gpuModel}
                  className="bg-slate-800 p-2 rounded-md w-full text-white"
                  onChange={(e) => handleInputChange(e, setGpuModel, setGpuSuggestions, gpuData)}
                  onFocus={() =>
                    handleInputChange(
                      { target: { value: gpuModel } },
                      setGpuModel,
                      setGpuSuggestions,
                      gpuData
                    )
                  }
                  onKeyDown={(e) => handleKeyDown(e, gpuSuggestions, handleSuggestionClick, "gpu")}
                  onBlur={(e) => handleBlur("gpu", e)}
                  ref={gpuInputRef}
                />
              </li>
              {gpuSuggestions.length > 0 && (
                <ul
                  className="bg-slate-700 p-2 rounded-md mt-2"
                  ref={gpuSuggestionsRef}
                  onBlur={(e) => handleBlur("gpu", e)}
                >
                  {gpuSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className={`text-white cursor-pointer outline-none p-0.5 rounded-sm ${
                        index === suggestionIndex ? "bg-blue-600" : ""
                      }`}
                      onClick={() => handleSuggestionClick(suggestion, "gpu")}
                      onKeyDown={(e) =>
                        handleKeyDown(e, gpuSuggestions, handleSuggestionClick, "gpu")
                      }
                      tabIndex={0}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}

              <li>
                <strong>RAM:</strong>
                <input
                  type="number"
                  value={ram}
                  onChange={(e) => setRam(e.target.value)}
                  className="bg-slate-800 p-2 rounded-md w-full text-white"
                />
              </li>
              <li>
                <strong>Operating System:</strong>
                <div className="relative">
                  <input
                    type="text"
                    value={os}
                    onChange={(e) => setOs(e.target.value)}
                    className="bg-slate-800 p-2 rounded-md w-full text-white"
                  />
                  <div className="absolute right-2 top-2 h-full">
                    {os && (
                      <FontAwesomeIcon
                        icon={checkOs() ? faCheck : faTimes}
                        size="lg"
                        className={`flex items-center ${
                          checkOs() ? "text-green-500" : "text-red-500"
                        }`}
                      />
                    )}
                  </div>
                </div>
              </li>
              <li>
                <strong>Bit:</strong>
                <div className="relative flex">
                  <input
                    type="text"
                    value={bit}
                    onChange={(e) => setBit(e.target.value)}
                    className="bg-slate-800 p-2 rounded-md w-full text-white"
                  />
                  <div className="absolute right-2 top-2 h-full">
                    {bit && (
                      <FontAwesomeIcon
                        icon={checkBit() ? faCheck : faTimes}
                        size="lg"
                        className={`flex items-center  ${
                          checkBit() ? "text-green-500" : "text-red-500"
                        }`}
                      />
                    )}
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="flex justify-between mt-6">
            <button
              onClick={handleAutoFill}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg"
            >
              Submit
            </button>
            <button
              onClick={handleAutoFill}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-lg"
            >
              Auto-Fill
            </button>
          </div>
        </div>
      </div>
      <LoadingPopup
        visible={loading}
        timeout={timeoutStat}
        onClose={popupClose}
        onError={sendSysInfo}
      />
    </div>
  );
}
