import "./App.css";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Aside from "./components/Aside";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="w-screen relative bg-[#282c34]">
      <Navbar />
      <div className="flex">
        <Main />
        <Aside />
      </div>
      <Footer />
    </div>
  );
}
export default App;
