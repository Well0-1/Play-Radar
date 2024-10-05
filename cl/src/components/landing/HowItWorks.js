import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLaptopCode,
  faCog,
  faServer,
  faQuestionCircle,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";

export default function HowItWorks() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Is the app safe?",
      answer:
        "Yes, the app runs a local server on your machine. This means your data is only accessible within your own network, ensuring privacy.",
    },
    {
      question: "How does the system collect my information?",
      answer:
        "It uses specific tools to collect details from your computer, and sends details to its own server, and our web page receives and processes this data while the server is running.",
    },
    {
      question: "Can I see the source code?",
      answer: (
        <>
          Sure! Check it out on{" "}
          <a
            href="https://github.com/Well0-1/Play-Radar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
          >
            GitHub
          </a>
          .
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-700 to-slate-900 text-white p-4 sm:p-8">
      {/* Section: How It Works */}
      <header className="w-full text-center py-8">
        <h1 className="text-3xl font-bold text-white">How it Works</h1>
        <p className="mt-4 text-lg text-gray-300">
          Here's a quick overview of how Play Radar works.
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
            Play Radar collects your system's details and helps you check if your computer can run
            specific games.
          </p>
        </div>
        <div className="lg:w-2/3 w-11/12 bg-gray-900 p-4 rounded-lg hover:bg-slate-800 transition duration-300 overflow-x-auto text-start font-mono">
          <pre className="text-gray-400 whitespace-pre-wrap text-start max-lg:text-sm">
            {`// Serve system information via a local endpoint
// Which can only be accessed from your local network

expressApp.get("/system-info", async (req, res) => {
  try {
    const systemInfo = await getSystemInfo(); // Gathers system information
    res.json(systemInfo);
  }
});

// Start the server on port 50000 for local use only
const server = expressApp.listen(50000, () => {
  console.log("Server running on port 50000");
});

// Data is saved to local storage to avoid repeated application runs`}
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
            After gathering your system’s details, we analyze them to check compatibility with
            various games.
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
            We use secure servers to manage and process the information your system provides.
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
          Play Radar makes it easy to ensure your system is always ready for the latest games.
        </p>
      </section>

      {/* Section: Frequently Asked Questions */}
      <section className="py-8 space-y-6">
        <h2 className="text-3xl font-bold text-white text-center lg:text-start">
          <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" />
          Frequently Asked Questions
        </h2>

        <div className="flex flex-col justify-center lg:justify-start gap-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`w-full bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700 transition-all duration-300 ${
                openIndex === index ? "bg-slate-700" : ""
              }`}
            >
              <button
                className="w-full flex justify-between items-center text-left text-lg text-gray-300 font-semibold py-4 focus:outline-none hover:text-gray-400 transition-colors duration-300"
                onClick={() => toggleAccordion(index)}
              >
                <span>{faq.question}</span>
                <FontAwesomeIcon icon={openIndex === index ? faChevronUp : faChevronDown} />
              </button>
              <div
                className={`overflow-hidden border-t border-gray-500 transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100 pt-4" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-white">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
