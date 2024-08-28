import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptopCode, faCog, faServer, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-700 to-slate-900 text-white p-4 sm:p-8">
      {/* Header */}
      <header className="w-full text-center py-8">
        <h1 className="text-3xl font-bold text-white">How it Works</h1>
        <p className="mt-4 text-lg text-gray-300">
          Learn how our system gathers and processes your computer's information.
        </p>
      </header>

      {/* Section: System Information Gathering */}
      <section className="flex flex-col lg:flex-row py-8 lg:text-start text-center space-y-6 lg:space-y-0 items-center">
        <div className="lg:w-1/2 pr-0 lg:pr-4">
          <h2 className="text-2xl font-bold text-white">
            <FontAwesomeIcon icon={faLaptopCode} className="mr-2" />
            Gathering System Information
          </h2>
          <p className="mt-4 text-gray-300">
            We collect information about your computer's components, such as your GPU, CPU, and RAM,
            to assess its capabilities.
          </p>
        </div>
        <div className="lg:w-2/3 w-11/12 bg-gray-900 p-4 rounded-lg hover:bg-slate-800 transition duration-300 overflow-x-auto text-star font-mono">
          <pre className="text-gray-400 whitespace-pre-wrap text-start max-lg:text-sm">
            {`// This is how we gather your system information
app.get("/api", async (req, res) => {
  try ({
    const cpuModel = cpuModels[0];
    const gpuModel = await gpuData();
    ...
    res.json({
    //Send JSON data to the client
});
`}
          </pre>
        </div>
      </section>

      {/* Section: Data Processing and Display */}
      <section className="flex flex-col py-8 lg:text-start text-center space-y-6 max-lg:items-center">
        <div className="lg:w-1/2 pr-0 lg:pr-4">
          <h2 className="text-2xl font-bold text-white">
            <FontAwesomeIcon icon={faCog} className="mr-2" />
            Processing and Displaying Data
          </h2>
          <p className="mt-4 text-gray-300">
            After gathering your system's data, we analyze it to determine how well your hardware
            can run specific games.
          </p>
        </div>
        <div className="lg:w-2/3 w-11/12 bg-gray-900 p-4 rounded-lg hover:bg-slate-800 transition duration-300 overflow-x-auto text-start font-mono">
          <pre className="text-gray-400 whitespace-pre-wrap text-start max-lg:text-sm">
            {`// We store the CPU model, and other details here for later use 
const [cpuModel, setCpuModel] = useState(""); // Cpu model name
const [gpuModel, setGpuModel] = useState(""); // GPU model name
const userCpuScore = getBenchmarkScore(cpuModel, cpuData);
...`}
          </pre>
        </div>
      </section>

      {/* Section: Server and API */}
      <section className="flex flex-col lg:flex-row py-8 lg:text-start text-center space-y-6 lg:space-y-0 items-center">
        <div className="lg:w-1/2 pr-0 lg:pr-4">
          <h2 className="text-2xl font-bold text-white">
            <FontAwesomeIcon icon={faServer} className="mr-2" />
            Server and API
          </h2>
          <p className="mt-4 text-gray-300">
            Our backend uses Express to manage system information and provides APIs for data
            processing.
          </p>
        </div>
        <div className="lg:w-2/3 w-11/12 bg-gray-900 p-4 rounded-lg hover:bg-slate-800 transition duration-300 overflow-x-auto text-start font-mono">
          <pre className="text-gray-400 whitespace-pre-wrap text-start max-lg:text-sm">
            {`// API endpoint to receive system information
app.post("/system-info", (req, res) => {
  const sysInfo = req.body; // Gathers the information sent by the user
  res.status(200).json({ message: "System info received successfully" });
});`}
          </pre>
        </div>
      </section>

      {/* Section: Conclusion */}
      <section className="py-8 text-center">
        <h2 className="text-2xl font-bold text-white">Conclusion</h2>
        <p className="mt-4 text-gray-300">
          Our platform provides a comprehensive overview of how well your system can run various
          games.
        </p>
      </section>

      {/* Section: Frequently Asked Questions */}
      <section className="py-8 space-y-6">
        <h2 className="text-2xl font-bold text-white lg:text-start text-center">
          <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" />
          Frequently Asked Questions
        </h2>
        <div className="w-full flex justify-center">
          <div className="space-y-10 w-9/12 lg:w-full flex flex-col bg-gray-900 hover:bg-slate-800 p-4 rounded-lg duration-300">
            <div className="mt-4 text-gray-300 space-y-4">
              <p>
                <strong>Q:</strong> How does the system collect my information?
              </p>
              <p>
                <strong>A:</strong> We securely gather and process your system data using
                industry-standard methods.
              </p>
            </div>
            <div className="mt-4 text-gray-300 space-y-4">
              <p>
                <strong>Q:</strong> Can I see the source code?
              </p>
              <p>
                <strong>A:</strong> Absolutely! You can view it on{" "}
                <a
                  href="https://github.com/Well0-1/Play-Radar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-blue-200 transition-colors duration-300"
                >
                  GitHub
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
