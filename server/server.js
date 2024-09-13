import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import gameRoutes from "./routes/gameRoutes.js";
import cors from "cors";
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

  if (!sysInfo.cpu || !sysInfo.gpu || !sysInfo.ram || !sysInfo.os || !sysInfo.bit) {
    return res.status(400).json({ error: "Invalid system information" });
  }

  console.log(sysInfo);
  res.status(200).json({ message: "System info received successfully " });
});

export default app;
