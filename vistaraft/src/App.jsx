import "./App.css";
import Payment from "./components/Payment/Payment";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Privacy from "./components/Privacy/Privacy";
import Terms from "./components/Terms/Terms";
import Contact from "./components/Contact/Contact";
import Cancellation from "./components/Cancellation/Cancellation";
import About from "./components/About/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Feedback from "./components/Feedback/Feedback";
import Booking from "./components/Booking/Booking";
import { useEffect, useState } from "react";
import ProcessPayment from "./components/ProcessPayment/ProcessPayment";
import Thanks from "./components/Thanks/Thanks";
import ThemeProvider from "./components/ThemeContext/ThemeContext";
import { useTheme } from "./components/ThemeContext/ThemeContext";
function App() {
const mode = useTheme();
  
    
  return (
    <ThemeProvider>
      <div className="w-screen max-w-full overflow-hidden">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/payment" element={<Payment   />} />
            <Route path="/terms" element={<Terms  />} />
            <Route path="/privacy" element={<Privacy  />} />
            <Route path="/cancellation" element={<Cancellation  />} />
            <Route path="/contact" element={<Contact  />} />
            <Route path="/about" element={<About  />} />
            <Route path="/feedback" element={<Feedback  />} />
            <Route path="/booking" element={<Booking  />} />
            <Route path="/process" element={<ProcessPayment  />} />
            <Route path="/thanks" element={<Thanks  />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
