import React, { useState, useEffect } from 'react';
import './Itenary.css'; // Add styles for your component

const Itenary = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [destinations, setDestinations] = useState([]); // State to store destinations from the database

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Fetch destinations from the backend
    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const response = await fetch('/api/destinations'); // Fetch data from the backend
                const data = await response.json();
                setDestinations(data); // Update the destinations state with fetched data
            } catch (error) {
                console.error('Error fetching destinations:', error);
            }
        };

        fetchDestinations();
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    return (
        <div className="itenary">
            <nav className="itenary-nav">
                <button className="itenary-button" onClick={toggleDropdown}>
                    Available Trips
                </button>
                {isDropdownOpen && (
                    <ul className="itenary-dropdown">
                        {destinations.length > 0 ? (
                            destinations.map((destination) => (
                                <li key={destination._id} className="itenary-item">
                                    {destination.heading}
                                </li>
                            ))
                        ) : (
                            <li className="itenary-item">No trips available</li>
                        )}
                    </ul>
                )}
            </nav>
        </div>
    );
};

export default Itenary;