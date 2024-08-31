import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Main from "./components/layout/Main";
import HowItWorks from "./components/landing/HowItWorks";
import Games from "./components/landing/Games";
import CustomGame from "./components/landing/CustomGame";

function App() {
  return (
    <div className="w-screen relative bg-slate-900">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/games/:id" element={<Games />} />
          <Route path="/howitworks" element={<HowItWorks />} />
          <Route path="/customGame" element={<CustomGame />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}
export default App;
