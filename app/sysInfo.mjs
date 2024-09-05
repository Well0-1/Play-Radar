import { arch, cpus, totalmem } from "os";
import osName from "os-name";
import si from "systeminformation";

export async function getSystemInfo() {
  try {
    const cpuModels = cpus().map((cpu) => cpu.model);
    const cpuModel = cpuModels.length > 0 ? cpuModels[0] : "No information available";
    const ram = totalmem();
    const bit = arch();
    const osVersion = osName();
    const gpuInfo = await si.graphics();
    return {
      cpu: cpuModel,
      gpu: gpuInfo.controllers.length > 0 ? gpuInfo.controllers[0].model : "No GPU found",
      ram: Math.ceil(ram / 1024 ** 3),
      osVersion: osVersion,
      bit: bit,
    };
  } catch (error) {
    console.error("Error fetching system information:", error);
    return null;
  }
}
