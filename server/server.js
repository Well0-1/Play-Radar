const express = require("express");
const os = require("os");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

app.post("/system-info", (req, res) => {
  const sysInfo = req.body;
  console.log(sysInfo);
  res.status(200).json({ message: "System info received successfully " });
});

app.get("/api", (req, res) => {
  const userOs = os.platform();
  const bit = os.arch();
  const cpuModels = os.cpus().map((cpu) => cpu.model);
  const cpuModel = cpuModels.length > 0 ? cpuModels[0] : "No information available";
  const ramByte = os.totalmem();
  const ramGB = Math.ceil(ramByte / (1024 * 1024 * 1024));

  res.json({
    cpuModel,
    ramGB,
    userOs,
    bit,
  });
});

app.get("/test", (req, res) => {
  res.json({ test: "test" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
