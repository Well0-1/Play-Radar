import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLaptopCode,
  faCog,
  faServer,
  faRocket,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-700 to-slate-900 text-white p-4 sm:p-8">
      {/* Header */}
      <header className="w-full text-center py-8">
        <h1 className="text-3xl font-bold text-white">How it Works</h1>
        <p className="mt-4 text-lg text-gray-300">
          This page explains how our system collects and processes your system
          information.
        </p>
      </header>

      {/* Section: System Information Gathering */}
      <section className="flex flex-col lg:flex-row py-8 lg:text-start text-center space-y-6 lg:space-y-0 items-center">
        <div className="lg:w-1/2 pr-0 lg:pr-4">
          <h2 className="text-2xl font-bold text-white">
            <FontAwesomeIcon icon={faLaptopCode} className="mr-2" />
            System Information Gathering
          </h2>
          <p className="mt-4 text-gray-300">
            We gather system information such as your GPU, CPU, RAM, and more
            using specific modules.
          </p>
        </div>
        <div className="lg:w-2/3 w-11/12 bg-gray-900 p-4 rounded-lg hover:bg-slate-800 transition duration-300 overflow-x-auto text-start">
          <pre className="text-gray-400 whitespace-pre-wrap">
            {`const fetchGPUData = async () => {
  const gpu = await getGPUTier();
  // Process GPU data here...
};`}
          </pre>
        </div>
      </section>

      {/* Section: Data Processing and Display */}
      <section className="flex flex-col py-8 lg:text-start text-center space-y-6 max-lg:items-center">
        <div className="lg:w-1/2 pr-0 lg:pr-4">
          <h2 className="text-2xl font-bold text-white">
            <FontAwesomeIcon icon={faCog} className="mr-2" />
            Data Processing and Display
          </h2>
          <p className="mt-4 text-gray-300">
            Once the data is collected, we process and display it dynamically on
            the interface.
          </p>
        </div>
        <div className="lg:w-2/3 w-11/12 bg-gray-900 p-4 rounded-lg hover:bg-slate-800 transition duration-300 overflow-x-auto text-start">
          <pre className="text-gray-400 whitespace-pre-wrap">
            {`const [gpuModel, setGpuModel] = useState("");
const [benchmark, setBenchmark] = useState(0);`}
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
            Our backend server is powered by Express, providing endpoints to
            fetch and process system information.
          </p>
        </div>
        <div className="lg:w-2/3 w-11/12 bg-gray-900 p-4 rounded-lg hover:bg-slate-800 transition duration-300 overflow-x-auto text-start">
          <pre className="text-gray-400 whitespace-pre-wrap">
            {`app.post("/system-info", (req, res) => {
  const sysInfo = req.body;
  res.status(200).json({ message: "System info received" });
});`}
          </pre>
        </div>
      </section>

      {/* Section: Advanced User Features */}
      <section className="py-8 flex flex-col items-center lg:items-start">
        <h2 className="text-2xl font-bold text-white">
          <FontAwesomeIcon icon={faRocket} className="mr-2" />
          Advanced User Features
        </h2>
        <ul className="mt-4 space-y-4 text-gray-300 list-disc pl-6">
          <li>
            <strong>Feature 1:</strong> Benchmark comparisons based on your CPU
            model.
          </li>
          <li>
            <strong>Feature 2:</strong> Real-time GPU tier assessment.
          </li>
        </ul>
      </section>

      {/* Section: Conclusion */}
      <section className="py-8 text-center">
        <h2 className="text-2xl font-bold text-white">Conclusion</h2>
        <p className="mt-4 text-gray-300">
          Our system provides a seamless way to assess your hardware and plan
          future improvements.
        </p>
      </section>

      {/* Section: Frequently Asked Questions */}
      <section className="py-8 space-y-6">
        <h2 className="text-2xl font-bold text-white lg:text-start text-center">
          <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" />
          Frequently Asked Questions
        </h2>
        <div className="w-full flex justify-center">
          <div className="space-y-10 w-9/12 lg:w-full flex flex-col">
            <div className="mt-4 text-gray-300 space-y-4">
              <p>
                <strong>Q:</strong> How does the system collect my information?
              </p>
              <p>
                <strong>A:</strong> We use secure modules to gather and process
                your system data without compromising privacy.
              </p>
            </div>
            <div className="mt-4 text-gray-300 space-y-4">
              <p>
                <strong>Q:</strong> Can I see the source code?
              </p>
              <p>
                <strong>A:</strong> Of course you can! Check it out on{" "}
                <a
                  href="https://github.com/Well0-1/Play-Radar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-blue-200 transition-colors duration-300"
                >
                  GitHub
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
