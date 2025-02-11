import "./App.css";
//components

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Privacy from "./components/Privacy/Privacy";
import Terms from "./components/Terms/Terms";
import Contact from "./components/Contact/Contact";
import Cancellation from "./components/Cancellation/Cancellation";
import About from "./components/About/About";
import Jan from "./components/Jan/Jan";
import Feb from "./components/Feb/Feb";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Feedback from "./components/Feedback/Feedback";


function App() {
  return (
    <>
      <div className="w-screen max-w-full overflow-hidden">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/cancellation" element={<Cancellation />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/jan" element={<Jan />} />
            <Route path="/feb" element={<Feb />} />
            <Route path="/feedback" element={<Feedback />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </>
  );
}

export default App;
