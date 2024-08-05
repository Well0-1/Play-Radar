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

  //later days
  console.log(isMobile);
  console.log(gpuTier);
  console.log(benchmark);

  return (
    <div className="w-full h-full relative flex flex-col lg:p-[2%]">
      <h1 className="text-white text-4xl">GPU: {gpuModel ? gpuModel : "Loading..."}</h1>
      <h1 className="text-white text-4xl">CPU: {cpu || "Loading..."}</h1>
      <h1 className="text-white text-4xl">RAM: {ram ? `${ram} GB` : "Loading..."}</h1>
      <h1 className="text-white text-4xl">{bit ? `${bit} based ${os}` : "Loading..."}</h1>
      <button className="border-2 w-fit" onClick={sendSysInfo}>
        I DON'T CARE ABOUT PRIVACY I'M NOT THAT IMPORTANT
      </button>
    </div>
  );
}
