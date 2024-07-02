import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import Main from "./components/landing/Main";
import HowItWorks from "./components/landing/howItWorks";

function App() {
  return (
    <div className="w-screen relative bg-[#282c34]">
      <Navbar />
      {/* <SearchBar /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="howitworks" element={<HowItWorks />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}
export default App;
