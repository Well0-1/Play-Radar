import express from "express";
import os from "os";
import mongoose from "mongoose";
import si from "systeminformation";
import { config } from "dotenv";
import gameRoutes from "./routes/gameRoutes.js";
import cors from "cors";
import osName from "os-name";

config();

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", gameRoutes);

const mongoURI = process.env.mongoURI;

mongoose
  .connect(mongoURI)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Database and Server Connection Successful, Listening on ${PORT}`);
    })
  )
  .catch((err) => console.error("Error connecting to MongoDB Atlas:", err));

app.post("/api/system-info", (req, res) => {
  const sysInfo = req.body;
  console.log(sysInfo);
  res.status(200).json({ message: "System info received successfully " });
});

async function gpuData() {
  try {
    const gpus = await si.graphics();
    return gpus.controllers.length > 0 ? gpus.controllers[0].model : "No GPU found";
  } catch (err) {
    console.error("An Error has occurred", err);
    return "Error retrieving GPU data";
  }
}

app.get("/api/userSys", async (req, res) => {
  try {
    const userOs = osName();
    const bit = os.arch();
    const cpuModels = os.cpus().map((cpu) => cpu.model);
    const cpuModel = cpuModels.length > 0 ? cpuModels[0] : "No information available";
    const gpuModel = await gpuData();
    const ramByte = os.totalmem();
    const ramGB = Math.ceil(ramByte / (1024 * 1024 * 1024));

    res.json({
      cpuModel,
      gpuModel,
      ramGB,
      userOs,
      bit,
    });
  } catch (err) {
    console.error("Error retrieving system info:", err);
    res.status(500).json({ error: "Failed to retrieve system info" });
  }
});

app.get("/api/test", (req, res) => {
  res.json({ test: "test" });
});

export default app;
