import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Aside from "./components/Aside";

function App() {
  return (
    <div className="w-screen h-screen relative bg-[#282c34]">
      <Navbar />
      <Aside />
      <div className="w-screen"></div>

      <Footer />
    </div>
  );
}

export default App;
