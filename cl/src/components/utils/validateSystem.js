import { getBenchmarkScore } from "./getBenchmarkScore";
import gpuData from "../data/gpu_data.json";
import cpuData from "../data/cpu_data.json";

export const validateSystem = (cpu, gpu, ram, os, bit, minCpu, minGpu, minRam, minBit, minOs) => {
  const userCpuScore = getBenchmarkScore(cpu, cpuData);
  const userGpuScore = getBenchmarkScore(gpu, gpuData);
  const minCpuScore = getBenchmarkScore(minCpu, cpuData);
  const minGpuScore = getBenchmarkScore(minGpu, gpuData);
  let issues = [];

  const OS_VERSIONS = {
    "Windows XP": 5,
    "Windows Vista": 6,
    "Windows 7": 7,
    "Windows 8": 8,
    "Windows 10": 10,
    "Windows 11": 11,
  };

  if (!cpu || !gpu || !ram || !os || !bit || !minCpu || !minGpu || !minRam || !minBit || !minOs) {
    issues.push("You need to provide complete data entry.");
    return issues;
  }

  if ((!OS_VERSIONS[os] || !OS_VERSIONS[minOs]) && !os.includes("Linux")) {
    issues.push("Invalid operating system version provided.");
    return issues;
  }

  if (userCpuScore < minCpuScore) {
    issues.push("CPU does not meet the minimum requirements. Consider upgrading your CPU");
  }

  if (userGpuScore < minGpuScore) {
    issues.push("GPU does not meet the minimum requirements. Consider upgrading your GPU");
  }

  if (parseInt(ram) < parseInt(minRam)) {
    issues.push(`You have ${ram}GB RAM. Minimum required is ${minRam}GB. Consider adding more RAM`);
  }

  if (parseInt(bit) < parseInt(minBit)) {
    issues.push(
      `You are using a ${bit}-bit system. A ${minBit}-bit system is required. Consider upgrading your OS or hardware`
    );
  }

  if (OS_VERSIONS[os] < OS_VERSIONS[minOs]) {
    issues.push(
      `You are using ${os}. Minimum required version is ${minOs}. Consider upgrading your OS`
    );
  }

  return issues.length === 0 ? true : issues;
};
