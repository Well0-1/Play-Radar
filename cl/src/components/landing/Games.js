import { useEffect, useState } from "react";
import axios from "axios";
import { getGPUTier } from "detect-gpu";
import benchmarksData from "../data/cpu_benchmarks.json";
import { getBenchmarkScore } from "../utils/getBenchmarkScore.js";

export default function Games() {
  const [sysInfo, setSysInfo] = useState({});
  const [gpuModel, setGpuModel] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [gpuTier, setGpuTier] = useState(null);
  const [benchmark, setBenchmark] = useState("N/A");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSysInfo = async () => {
      try {
        const { data } = await axios.get("/api");
        setSysInfo(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching system info", err);
        setLoading(false);
      }
    };

    fetchSysInfo();
  }, []);

  useEffect(() => {
    const fetchGPUData = async () => {
      try {
        const gpu = await getGPUTier();
        setGpuModel(!gpu.device ? gpu.gpu : gpu.device);
        setIsMobile(gpu.isMobile);
        setGpuTier(gpu ? gpu.tier : "Unknown");
      } catch (err) {
        console.error("Error fetching GPU data", err);
      }
    };

    fetchGPUData();
  }, []);

  useEffect(() => {
    if (sysInfo.cpuModel) {
      const score = getBenchmarkScore(sysInfo.cpuModel, benchmarksData);
      setBenchmark(score);
    }
  }, [sysInfo.cpuModel]);

  const sendSysInfo = async () => {
    try {
      await axios.post("/system-info", {
        gpu: await getGPUTier(),
        cpuModel: sysInfo.cpuModel,
        ramGB: sysInfo.ramGB,
        os: sysInfo.userOs,
        bit: sysInfo.bit,
      });
      console.log("System info sent successfully");
    } catch (err) {
      console.error("Error sending system info", err);
    }
  };

  if (loading) {
    return <div className="text-white text-4xl">Loading...</div>;
  }

  const cpu = sysInfo.cpuModel;
  const ram = sysInfo.ramGB;
  const os = sysInfo.userOs;
  const bit = sysInfo.bit;

  console.log(cpu);
  console.log(ram);
  console.log(os);
  console.log(bit);
  console.log(isMobile);
  console.log(gpuTier);
  console.log(benchmark);

  return (
    // h-screen DONT FORGET NOOOOOOOOOOOOOOOOOOOOOOOOOooo
    <div className="w-full h-screen relative flex flex-col lg:p-4 text-white font-cairo">
      <main className="flex max-lg:flex-col justify-around p-4 lg:space-x-4 max-lg:space-y-4 font-cairo">
        <section className="lg:w-1/2 flex flex-col bg-slate-700 p-6 rounded-lg shadow-lg border border-slate-600 hover:bg-slate-600 transition duration-300">
          <h2 className="text-3xl font-bold pb-4 text-white">Minimum System Requirements</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-300 font-inter">
            <li>Operating System:</li>
            <li>Processor:</li>
            <li>Memory:</li>
            <li>Graphics:</li>
          </ul>
        </section>
        <section className="lg:w-1/2 flex flex-col bg-slate-700 p-6 rounded-lg shadow-lg border border-slate-600 hover:bg-slate-600 transition duration-300">
          <h2 className="text-3xl font-bold pb-4 text-white">Recommended System Requirements</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-300 font-inter">
            <li>Operating System:</li>
            <li>Processor:</li>
            <li>Memory:</li>
            <li>Graphics:</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
