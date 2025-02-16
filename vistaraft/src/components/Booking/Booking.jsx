import logo from "@/assets/logoVista.jpg";
import {useState, useEffect} from "react";
import {Link, useLocation} from "react-router-dom";
import Card from "../Card/Card";
import { useTheme } from "../ThemeContext/ThemeContext";


function Booking(){
    const [destinations, setDestinations] = useState([]);
    const {mode} = useTheme();
    useEffect(() => {
      fetch(`${import.meta.env.VITE_HOST}/api/destinations`)
        .then((response) => response.json())
        .then((data) => setDestinations(data))
        .catch((error) => console.error("Error fetching destinations:", error));
        
    }, []);
    
    return(
        <div className={`overflow-hidden ${mode==='light'?'!bg-gray-100': 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900'}`}>
        <h1 className="mt-4 text-center mb-8 text-4xl font-extrabold md:text-5xl lg:text-6xl">
        <span className={`text-transparent bg-clip-text ${mode==='dark'?'bg-gradient-to-r from-teal-400 to-blue-500':'bg-gradient-to-r from-teal-800 to-blue-700'}`}>
          Available
        </span>{" "}
        <span className={`${mode==='dark'?'text-green-400':'text-green-800'}`}>Trips</span>
      </h1>

      {/* Grid Container for Cards */}
      <div id="discover" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-8 pb-12">
        {destinations.map((destination) => (<Card key={destination.id} heading={destination.heading} description={destination.description} photo={destination.photo} />))}
      </div>
    </div>
    )
};
export default Booking;