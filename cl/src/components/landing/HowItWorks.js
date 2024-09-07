import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptopCode, faCog, faServer, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-700 to-slate-900 text-white p-4 sm:p-8">
      {/* Section. Introduction */}
      <section className="w-full text-center py-8 space-y-8">
        <h1 className="text-3xl font-bold text-white">
          Play Radar - Your Ultimate Game Compatibility Guide
        </h1>
        <p className="text-lg text-gray-300">
          <strong>Play Radar</strong> is a platform designed to help gamers assess the compatibility
          of their system with various video games. Our goal is to provide a comprehensive and
          user-friendly experience, enabling users to understand their hardware's capabilities and
          how well they can run specific games.
        </p>

        {/* Section: What is Play Radar*/}
        <div className="pt-6 text-center">
          <h2 className="text-3xl font-bold text-white">🎮 What is Play Radar?</h2>
          <p className="pt-4 text-lg text-gray-300">
            Play Radar is a web application that gathers system information from your computer, such
            as CPU, GPU, RAM details. It then compares these specifications against the minimum and
            recommended requirements of popular games, providing an instant compatibility analysis.
            Whether you're looking to check if your current setup can handle the latest games or
            planning to upgrade your system, Play Radar has you covered!
          </p>
        </div>
      </section>

      {/* Section: How It Works */}
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
            We collect your system's information through an application created by us, but how does
            this application work?
          </p>
        </div>
        <div className="lg:w-2/3 w-11/12 bg-gray-900 p-4 rounded-lg hover:bg-slate-800 transition duration-300 overflow-x-auto text-start font-mono">
          <pre className="text-gray-400 whitespace-pre-wrap text-start max-lg:text-sm">
            {`// This endpoint serves the system information collected by our application.
// We host a local server that exposes this endpoint, which can only be accessed from your local network.
// This means your data is not accessible from the internet and remains secure.

expressApp.get("/system-info", async (req, res) => {
  try {
    const systemInfo = await getSystemInfo(); // This function gathers system information
    res.json(systemInfo);
});

// Start the server on port 50000. This server is intended to run locally on your machine,
// ensuring that your system information is securely handled and not exposed to the wider internet.
const server = expressApp.listen(50000, () => {
});

// And we save this data to localstorage so you wont have to run our application again and again
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
                <strong>Q:</strong> Is the app safe?
              </p>
              <p className="w-1/2">
                <strong>A:</strong> Our application runs a local server on your machine that listens
                for requests. This server is only accessible from your local network, so your data
                stays private and is not accessible from outside.
              </p>
            </div>{" "}
            <div className="mt-4 text-gray-300 space-y-4">
              <p>
                <strong>Q:</strong> How does the system collect my information ?
              </p>
              <p className="w-1/2">
                <strong>A:</strong> It uses specific tools to collect details from your computer,
                and sends details to its own server, and our web page receives and processes this
                data while the server is running.
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
