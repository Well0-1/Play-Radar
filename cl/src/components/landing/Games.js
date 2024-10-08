import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import cpuData from "../data/cpu_data.json";
import gpuData from "../data/gpu_data.json";
import LoadingPopup from "../utils/LoadingPopup.js";
import Conclusion from "../utils/Conclusion.js";
import { getBenchmarkScore } from "../utils/getBenchmarkScore.js";
import { validateSystem } from "../utils/validateSystem.js";
import { Bar } from "react-chartjs-2";
import { Skeleton } from "@mui/material";

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
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [gameVerify, setGameVerify] = useState(true);
  const [cpuModel, setCpuModel] = useState("");
  const [gpuModel, setGpuModel] = useState("");
  const [ram, setRam] = useState("");
  const [os, setOs] = useState("");
  const [bit, setBit] = useState("");
  const [cpuSuggestions, setCpuSuggestions] = useState([]);
  const [gpuSuggestions, setGpuSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [sysDataStat, setSysDataStat] = useState(false);
  const [issues, setIssues] = useState([]);
  const [conclusionStat, setConclusionStat] = useState(null);
  const [visible, setVisible] = useState(false);
  const [serverActive, setServerActive] = useState(false);
  const API = process.env.REACT_APP_API;
  const token = process.env.REACT_APP_TOKEN;

  const cpuInputRef = useRef(null);
  const gpuInputRef = useRef(null);
  const cpuSuggestionsRef = useRef(null);
  const gpuSuggestionsRef = useRef(null);

  const checkServer = async () => {
    try {
      const response = await fetch("http://localhost:50000/system-info");

      if (response.ok) {
        const sysInfo = await response.json();
        localStorage.setItem("userSystem", JSON.stringify(sysInfo));
        setServerActive(true);
      }
    } catch (error) {
      setServerActive(false);
    }
  };

  useEffect(() => {
    axios
      .get(`${API}/api/game/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setGame(res.data);
        setGameVerify(false);
      })
      .catch((err) => {
        console.error("Games data is corrupted");
      });
  }, [id, API, token]);

  useEffect(() => {
    const storedSystemInfo = localStorage.getItem("userSystem");

    if (storedSystemInfo) {
      //pass
    } else {
      const interval = setInterval(() => {
        if (!serverActive) {
          checkServer();
        }
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [serverActive]);

  if (gameVerify) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 text-white p-6">
        <div className="space-y-10 pb-12">
          <div className="flex items-center justify-center flex-col">
            <Skeleton variant="text" width={"40%"} sx={{ fontSize: "2.5rem" }} />
            <Skeleton variant="text" width={"20%"} sx={{ fontSize: "1.5rem" }} />
          </div>
          <div className="flex items-center justify-center max-w-full">
            <Skeleton variant="rounded" width={"56rem"} height={"30rem"} />
          </div>
          <div className="flex flex-col lg:flex-row justify-between lg:space-x-8 max-lg:space-y-8">
            <Skeleton variant="rounded" width={"100%"} height={"22rem"} />
            <Skeleton variant="rounded" width={"100%"} height={"22rem"} />
          </div>
          <Skeleton variant="rounded" width={"100%"} height={"40rem"} />
        </div>
      </div>
    );
  }

  const handleInputChange = (e, setState, setSuggestions, data) => {
    const { value } = e.target;
    setSuggestionIndex(0);
    setState(value);

    const matches = data
      .filter((model) => model.model.toLowerCase().includes(value.toLowerCase()))
      .slice(0, 5)
      .map((match) => match.model);

    setSuggestions(matches);
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

  const autoFill = () => {
    const data = JSON.parse(localStorage.getItem("userSystem"));
    setCpuModel(data.cpu);
    setGpuModel(data.gpu);
    setRam(data.ram);
    setOs(data.osVersion);
    setBit(data.bit === "x64" || data.bit === "amd64" || data.bit === "x86_64" ? 64 : 32);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleAutoFill = async () => {
    setLoading(true);
    if (localStorage.getItem("userSystem")) {
      autoFill();
    } else {
      setLoading(false);
      setSysDataStat(true);
    }
  };

  const checkSystem = () => {
    const res = validateSystem(
      cpuModel,
      gpuModel,
      ram,
      os,
      bit,
      game.minRequirements.cpu,
      game.minRequirements.gpu,
      game.minRequirements.ram,
      game.minRequirements.bit,
      game.minRequirements.os
    );
    setIssues(res === true ? [] : res);
    setConclusionStat(res === true);
    setVisible(true);
  };

  const sendSysInfo = async () => {
    try {
      await axios.post(
        `${API}/api/system-info`,
        {
          cpu: cpuModel,
          gpu: gpuModel,
          ram: ram,
          os: os,
          bit: bit,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Successfuly Deployed");
      popupClose();
    } catch (err) {
      alert("Something Went Wrong");
      popupClose();
    }
  };

  const popupClose = () => {
    setLoading(loading ? setLoading(false) : setSysDataStat(false));
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

  const date = new Date(game.releaseDate);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 text-white p-6">
      <div className={`${loading || sysDataStat ? "blur-sm" : "blur-0"} space-y-10`}>
        {/* Game Title and Release Information */}
        <div className="text-center">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-wide">{game.gameName}</h1>
          <p className="text-gray-400 pt-2">
            {game.company} - {formattedDate}
          </p>
        </div>

        {/* Game Cover Image */}
        <div className="flex justify-center">
          <img
            src={game.imgUrl}
            alt={`${game.gameName} Cover`}
            className="max-w-full lg:max-w-4xl rounded-xl object-cover shadow-lg"
          />
        </div>

        {/* System Requirements Sections */}
        <div className="flex flex-col lg:flex-row justify-between lg:space-x-8 max-lg:space-y-8">
          <section className="flex-1 bg-slate-700 p-6 rounded-lg shadow-lg border border-slate-600 hover:bg-slate-600 transition duration-300">
            <h2 className="text-2xl lg:text-3xl text-center lg:text-start font-bold pb-4">
              Minimum System Requirements
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-300 font-inter">
              <li>Processor: {game.minRequirements.cpu}</li>
              <li>Graphics: {game.minRequirements.gpu}</li>
              <li>Memory: {game.minRequirements.ram} GB</li>
              <li>Operating System: {game.minRequirements.os}</li>
              <li>Bit: {game.minRequirements.bit}</li>
            </ul>
          </section>

          <section className="flex-1 bg-slate-700 p-6 rounded-lg shadow-lg border border-slate-600 hover:bg-slate-600 transition duration-300">
            <h2 className="text-2xl lg:text-3xl text-center lg:text-start font-bold pb-4">
              Recommended System Requirements
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-300 font-inter">
              <li>Processor: {game.recRequirements.cpu}</li>
              <li>Graphics: {game.recRequirements.gpu}</li>
              <li>Memory: {game.recRequirements.ram} GB</li>
              <li>Operating System: {game.recRequirements.os}</li>
              <li>Bit: {game.recRequirements.bit}</li>
            </ul>
          </section>
        </div>

        {/* Comparison Section */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg space-y-6">
          <h2 className="text-2xl lg:text-3xl font-bold text-center">
            Your System vs Game Requirements
          </h2>
          <div className="w-full lg:w-2/3 h-64 mx-auto">
            <Bar data={data} options={options} />
          </div>
          <h5 className="text-xs font-extralight text-slate-400 text-center">
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
                  className="bg-slate-700 p-2 rounded-md pt-2"
                  ref={cpuSuggestionsRef}
                  tabIndex={-1}
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
                <ul className="bg-slate-700 p-2 rounded-md pt-2" ref={gpuSuggestionsRef}>
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
                </div>
              </li>
              <li>
                <strong>Bit:</strong>
                <div className="relative flex">
                  <input
                    type="number"
                    value={bit}
                    onChange={(e) => setBit(e.target.value)}
                    className="bg-slate-800 p-2 rounded-md w-full text-white"
                  />
                </div>
              </li>
            </ul>
          </div>
          <div className="flex justify-between pt-6">
            <button
              onClick={checkSystem}
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
        <Conclusion
          visible={visible}
          status={conclusionStat}
          issues={issues}
          sysInfo={sendSysInfo}
        />
      </div>
      <LoadingPopup visible={loading} systemData={sysDataStat} onClose={popupClose} />
    </div>
  );
}
