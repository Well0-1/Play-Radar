import React, { useState, useRef } from "react";
import axios from "axios";
import cpuData from "../data/cpu_data.json";
import gpuData from "../data/gpu_data.json";
import LoadingPopup from "../utils/LoadingPopup.js";
import Conclusion from "../utils/Conclusion.js";
import { validateSystem } from "../utils/validateSystem.js";
import { getBenchmarkScore } from "../utils/getBenchmarkScore.js";
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

export default function CustomGame() {
  const [cpuModel, setCpuModel] = useState("");
  const [gpuModel, setGpuModel] = useState("");
  const [ram, setRam] = useState("");
  const [os, setOs] = useState("");
  const [bit, setBit] = useState("");
  const [cpuSuggestions, setCpuSuggestions] = useState([]);
  const [gpuSuggestions, setGpuSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timeoutStat, setTimeoutStat] = useState(false);
  const [minCpu, setMinCpu] = useState("");
  const [minGpu, setMinGpu] = useState("");
  const [minRam, setMinRam] = useState("");
  const [minOs, setMinOs] = useState("");
  const [minBit, setMinBit] = useState(null);
  const [recCpu, setRecCpu] = useState("");
  const [recGpu, setRecGpu] = useState("");
  const [recRam, setRecRam] = useState("");
  const [recOs, setRecOs] = useState("");
  const [recBit, setRecBit] = useState(null);
  const [minCpuSuggestions, setMinCpuSuggestions] = useState([]);
  const [minGpuSuggestions, setMinGpuSuggestions] = useState([]);
  const [recCpuSuggestions, setRecCpuSuggestions] = useState([]);
  const [recGpuSuggestions, setRecGpuSuggestions] = useState([]);
  const [conclusionStat, setConclusionStat] = useState(null);
  const [visible, setVisible] = useState(false);
  const [issues, setIssues] = useState([]);

  // 😫

  const cpuInputRef = useRef(null);
  const gpuInputRef = useRef(null);
  const minCpuInputRef = useRef(null);
  const minGpuInputRef = useRef(null);
  const recCpuInputRef = useRef(null);
  const recGpuInputRef = useRef(null);
  const cpuSuggestionsRef = useRef(null);
  const gpuSuggestionsRef = useRef(null);
  const minCpuSuggestionsRef = useRef(null);
  const minGpuSuggestionsRef = useRef(null);
  const recCpuSuggestionsRef = useRef(null);
  const recGpuSuggestionsRef = useRef(null);

  const handleInputChange = (e, setState, setSuggestions, data) => {
    const { value } = e.target;
    setState(value);

    const matches = data.filter((model) => model.model.toLowerCase().includes(value.toLowerCase()));

    setSuggestions(matches.slice(0, 3).map((match) => match.model));
  };

  const handleSuggestionClick = (suggestion, type) => {
    const stateMap = {
      cpu: setCpuModel,
      gpu: setGpuModel,
      minCpu: setMinCpu,
      minGpu: setMinGpu,
      recCpu: setRecCpu,
      recGpu: setRecGpu,
    };

    const suggestionsMap = {
      cpu: setCpuSuggestions,
      gpu: setGpuSuggestions,
      minCpu: setMinCpuSuggestions,
      minGpu: setMinGpuSuggestions,
      recCpu: setRecCpuSuggestions,
      recGpu: setRecGpuSuggestions,
    };

    const setState = stateMap[type];
    const setSuggestions = suggestionsMap[type];

    setState(suggestion);
    setSuggestions([]);
  };

  const handleBlur = (type, event) => {
    const refMap = {
      cpu: cpuSuggestionsRef,
      gpu: gpuSuggestionsRef,
      minCpu: minCpuSuggestionsRef,
      minGpu: minGpuSuggestionsRef,
      recCpu: recCpuSuggestionsRef,
      recGpu: recGpuSuggestionsRef,
    };

    const suggestionsMap = {
      cpu: setCpuSuggestions,
      gpu: setGpuSuggestions,
      minCpu: setMinCpuSuggestions,
      minGpu: setMinGpuSuggestions,
      recCpu: setRecCpuSuggestions,
      recGpu: setRecGpuSuggestions,
    };

    const suggestionsRef = refMap[type];
    const setSuggestions = suggestionsMap[type];
    const isOutsideClick =
      suggestionsRef.current && !suggestionsRef.current.contains(event.relatedTarget);

    if (isOutsideClick) {
      setSuggestions([]);
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
      setLoading(false);
      setBit(data.bit === "x64" || data.bit === "amd64" || data.bit === "x86_64" ? 64 : 32);
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
    setLoading(loading ? setLoading(false) : setTimeoutStat(false));
  };

  const checkSystem = () => {
    const res = validateSystem(
      cpuModel,
      gpuModel,
      ram,
      os,
      bit,
      minCpu,
      minGpu,
      minRam,
      minBit,
      minOs
    );
    setIssues(res === true ? [] : res);
    setConclusionStat(res === true);
    setVisible(true);
  };

  const game = {
    minRequirements: {
      cpu: minCpu,
      gpu: minGpu,
      ram: minRam,
      os: minOs,
      bit: minBit,
    },
    recRequirements: {
      cpu: recCpu,
      gpu: recGpu,
      os: recOs,
      ram: recRam,
      bit: recBit,
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
          minRam,
        ],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
      {
        label: "Recommended Requirements",
        data: [
          getBenchmarkScore(game.recRequirements.cpu, cpuData),
          getBenchmarkScore(game.recRequirements.gpu, gpuData),
          recRam,
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
      <div className={`${loading || timeoutStat ? "blur-sm" : "blur-0"} space-y-12`}>
        <div className="text-center p-6 bg-gradient-to-r from-indigo-700 via-slate-700 to-pink-700 rounded-lg shadow-2xl space-y-6 opacity-70">
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-indigo-400 via-slate-400 to-pink-700">
            {/*Color is Still debatable*/}
            Custom Game Requirements Checker
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Configure the minimum and recommended system requirements for the game you want to play.
            Compare them with your current system to ensure you have what it takes to enjoy the game
            smoothly.
          </p>
          <div className="space-y-4 text-center text-gray-300">
            <p className="text-md">Follow these steps to see if your system can handle the game:</p>
            <ol className="list-decimal list-inside space-y-3 text-center lg:text-left max-w-md mx-auto ">
              <li className="flex items-start space-x-2">
                <span className="text-indigo-400">1.</span>
                <span>Enter the minimum and recommended requirements for the game.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-indigo-400">2.</span>
                <span>
                  Provide your system's information, or use the Auto-fill option to load it
                  automatically.
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-indigo-400">3.</span>
                <span>Click "Submit" to see if your system meets the game's requirements.</span>
              </li>
            </ol>
          </div>
        </div>

        {/* System Requirements Sections */}
        <div className="flex flex-col lg:flex-row justify-between lg:space-x-8 max-lg:space-y-8">
          <section className="flex-1 bg-slate-700 p-6 rounded-lg shadow-xl border border-slate-600 hover:bg-slate-600 transition-colors duration-500">
            <h2 className="text-2xl text-center lg:text-start font-bold pb-4">
              Minimum System Requirements
            </h2>
            <ul className="list-none pl-6 space-y-4 text-gray-300 font-inter">
              <li>
                <strong>Processor:</strong>
                <input
                  type="text"
                  value={minCpu}
                  className="bg-slate-800 p-2 rounded-lg w-full text-white shadow-inner"
                  onChange={(e) => handleInputChange(e, setMinCpu, setMinCpuSuggestions, cpuData)}
                  onFocus={() =>
                    handleInputChange(
                      { target: { value: minCpu } },
                      setMinCpu,
                      setMinCpuSuggestions,
                      cpuData
                    )
                  }
                  onBlur={(e) => handleBlur("minCpu", e)}
                  ref={minCpuInputRef}
                />
                {minCpuSuggestions.length > 0 && (
                  <div className="relative">
                    <ul
                      className="bg-gray-700 p-2 rounded-lg mt-2 absolute w-full shadow-lg"
                      tabIndex={-1}
                      ref={minCpuSuggestionsRef}
                    >
                      {minCpuSuggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          className="text-white cursor-pointer outline-none p-0.5 rounded-sm hover:bg-blue-600 transition-colors"
                          onClick={() => handleSuggestionClick(suggestion, "minCpu")}
                        >
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
              <li>
                <strong>Graphics:</strong>
                <input
                  type="text"
                  value={minGpu}
                  className="bg-slate-800 p-2 rounded-lg w-full text-white shadow-inner"
                  onChange={(e) => handleInputChange(e, setMinGpu, setMinGpuSuggestions, gpuData)}
                  onFocus={() =>
                    handleInputChange(
                      { target: { value: minGpu } },
                      setMinGpu,
                      setMinGpuSuggestions,
                      gpuData
                    )
                  }
                  onBlur={(e) => handleBlur("minGpu", e)}
                  ref={minGpuInputRef}
                />
                {minGpuSuggestions.length > 0 && (
                  <div className="relative">
                    <ul
                      className="bg-gray-700 p-2 rounded-lg mt-2 absolute w-full shadow-lg"
                      onBlur={(e) => handleBlur("minGpu", e)}
                      tabIndex={-1}
                      ref={minGpuSuggestionsRef}
                    >
                      {minGpuSuggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          className="text-white cursor-pointer outline-none p-0.5 rounded-sm hover:bg-blue-600 transition-colors"
                          onClick={() => handleSuggestionClick(suggestion, "minGpu")}
                        >
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
              <li>
                <strong>RAM:</strong>
                <input
                  type="number"
                  value={minRam}
                  onChange={(e) => setMinRam(e.target.value)}
                  className="bg-slate-800 p-2 rounded-lg w-full text-white shadow-inner"
                />
              </li>
              <li>
                <strong>OS:</strong>
                <input
                  type="text"
                  value={minOs}
                  onChange={(e) => setMinOs(e.target.value)}
                  className="bg-slate-800 p-2 rounded-lg w-full text-white shadow-inner"
                />
              </li>
              <li>
                <strong>Bit:</strong>
                <input
                  type="number"
                  value={minBit}
                  onChange={(e) => setMinBit(e.target.value)}
                  className="bg-slate-800 p-2 rounded-lg w-full text-white shadow-inner"
                />
              </li>
            </ul>
          </section>

          <section className="flex-1 bg-slate-700 p-6 rounded-lg shadow-xl border border-slate-600 hover:bg-slate-600 transition-colors duration-500">
            <h2 className="text-2xl text-center lg:text-start font-bold pb-4">
              Recommended System Requirements
            </h2>
            <ul className="list-none pl-6 space-y-4 text-gray-300 font-inter">
              <li>
                <strong>Processor:</strong>
                <input
                  type="text"
                  value={recCpu}
                  className="bg-slate-800 p-2 rounded-lg w-full text-white shadow-inner"
                  onChange={(e) => handleInputChange(e, setRecCpu, setRecCpuSuggestions, cpuData)}
                  onFocus={() =>
                    handleInputChange(
                      { target: { value: recCpu } },
                      setRecCpu,
                      setRecCpuSuggestions,
                      cpuData
                    )
                  }
                  onBlur={(e) => handleBlur("recCpu", e)}
                  ref={recCpuInputRef}
                />
                {recCpuSuggestions.length > 0 && (
                  <div className="relative">
                    <ul
                      className="bg-gray-700 p-2 rounded-lg mt-2 absolute w-full shadow-lg"
                      tabIndex={-1}
                      ref={recCpuSuggestionsRef}
                    >
                      {recCpuSuggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          className="text-white cursor-pointer outline-none p-0.5 rounded-sm hover:bg-blue-600 transition-colors"
                          onClick={() => handleSuggestionClick(suggestion, "recCpu")}
                        >
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
              <li>
                <strong>Graphics:</strong>
                <input
                  type="text"
                  value={recGpu}
                  className="bg-slate-800 p-2 rounded-lg w-full text-white shadow-inner"
                  onChange={(e) => handleInputChange(e, setRecGpu, setRecGpuSuggestions, gpuData)}
                  onFocus={() =>
                    handleInputChange(
                      { target: { value: recGpu } },
                      setRecGpu,
                      setRecGpuSuggestions,
                      gpuData
                    )
                  }
                  onBlur={(e) => handleBlur("recGpu", e)}
                  ref={recGpuInputRef}
                />
                {recGpuSuggestions.length > 0 && (
                  <div className="relative">
                    <ul
                      className="bg-gray-700 p-2 rounded-lg mt-2 absolute w-full shadow-lg"
                      ref={recGpuSuggestionsRef}
                      tabIndex={-1}
                    >
                      {recGpuSuggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          className="text-white cursor-pointer outline-none p-0.5 rounded-sm hover:bg-blue-600 transition-colors"
                          onClick={() => handleSuggestionClick(suggestion, "recGpu")}
                        >
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>

              <li>
                <strong>RAM:</strong>
                <input
                  type="number"
                  value={recRam}
                  onChange={(e) => setRecRam(e.target.value)}
                  className="bg-slate-800 p-2 rounded-lg w-full text-white shadow-inner"
                />
              </li>
              <li>
                <strong>OS:</strong>
                <input
                  type="text"
                  value={recOs}
                  onChange={(e) => setRecOs(e.target.value)}
                  className="bg-slate-800 p-2 rounded-lg w-full text-white shadow-inner"
                />
              </li>
              <li>
                <strong>Bit:</strong>
                <input
                  type="number"
                  value={recBit}
                  onChange={(e) => setRecBit(e.target.value)}
                  className="bg-slate-800 p-2 rounded-lg w-full text-white shadow-inner"
                />
              </li>
            </ul>
          </section>
        </div>
        {/* Comparison Section */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-xl space-y-6">
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
                  onBlur={(e) => handleBlur("cpu", e)}
                  ref={cpuInputRef}
                />
              </li>
              {cpuSuggestions.length > 0 && (
                <ul
                  className="bg-slate-700 p-2 rounded-md mt-2"
                  ref={cpuSuggestionsRef}
                  tabIndex={-1}
                >
                  {cpuSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="text-white cursor-pointer outline-none p-0.5 rounded-sm"
                      onClick={() => handleSuggestionClick(suggestion, "cpu")}
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
                  onBlur={(e) => handleBlur("gpu", e)}
                  ref={gpuInputRef}
                />
              </li>
              {gpuSuggestions.length > 0 && (
                <ul
                  className="bg-slate-700 p-2 rounded-md mt-2"
                  ref={gpuSuggestionsRef}
                  tabIndex={-1}
                >
                  {gpuSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="text-white cursor-pointer outline-none p-0.5 rounded-sm"
                      onClick={() => handleSuggestionClick(suggestion, "gpu")}
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
          <div className="flex justify-between">
            <button
              className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
              onClick={checkSystem}
            >
              Submit
            </button>
            <button
              className="bg-green-700 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
              onClick={handleAutoFill}
            >
              Auto-Fill
            </button>
          </div>
        </div>
        <Conclusion visible={visible} status={conclusionStat} issues={issues} />
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
