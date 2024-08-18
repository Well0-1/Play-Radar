const express = require("express");
const os = require("os");
const si = require("systeminformation");
const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

app.post("/system-info", (req, res) => {
  const sysInfo = req.body;
  console.log(sysInfo);
  res.status(200).json({ message: "System info received successfully " });
});

async function diskSpace() {
  try {
    const fsSizes = await si.fsSize();
    if (fsSizes.length > 0) {
      return (fsSizes[0].available / (1024 * 1024 * 1024)).toFixed(2);
    }
    return 0;
  } catch (err) {
    console.error("Error retrieving disk space", err);
    return 0;
  }
}

app.get("/api", async (req, res) => {
  try {
    const userOs = os.platform();
    const bit = os.arch();
    const cpuModels = os.cpus().map((cpu) => cpu.model);
    const cpuModel = cpuModels.length > 0 ? cpuModels[0] : "No information available";
    const ramByte = os.totalmem();
    const ramGB = Math.ceil(ramByte / (1024 * 1024 * 1024));
    const freeSpace = await diskSpace();

    res.json({
      cpuModel,
      ramGB,
      userOs,
      bit,
      freeSpace,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve system info" });
  }
});

app.get("/test", (req, res) => {
  res.json({ test: "test" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
