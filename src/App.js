import "./App.css";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Watchhistory from "./pages/Watchhistory";

function App() {
  return (
    <>
      <Header />
      <div className="container m-5">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/Watch-history" element={<Watchhistory />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
