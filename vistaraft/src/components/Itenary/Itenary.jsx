import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, MenuItem, Divider, Typography, Box } from "@mui/material";
import { useTheme } from "../ThemeContext/ThemeContext";

const Itenary = ({ isDropdownOpen, anchorEl, onClose ,inter}) => {
    const {mode} = useTheme()
    const [destinations, setDestinations] = useState([]);
    const [filteredDestinations, setFilteredDestinations] = useState([]);
    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_HOST}/api/destinations`
                );
                const data = await response.json();
                setDestinations(data); 
            } catch (error) {
                console.error("Error fetching destinations:", error);
            }
        };
      

        fetchDestinations();
        
    }, []);
useEffect(() => {
        const filtered = destinations.filter((destination) =>
            {if(inter==="international"){
                return destination?.inter===true
            }else if(inter==="dom"){
                return destination?.inter===false

            }}
        );
        setFilteredDestinations(filtered);
    }, [destinations, inter]);

    return (
        <Menu
            anchorEl={anchorEl}
            open={isDropdownOpen}
            onClose={onClose}
            PaperProps={{
                sx: { width: 250, p: 1 , background: mode === "dark" 
                    ? "linear-gradient(to right, #111827, #1f2937, #111827)" // your gradient
                    : "white",},
            }}
            
        >
            {filteredDestinations?.length > 0 ? (
                filteredDestinations?.map((destination, index) => (
                    <Box key={destination._id}>
                        <MenuItem sx={{'&:hover':{
                            backgroundColor: '#2ad4d7',
                            border:'round',
                            borderRadius:'5px',
                            color:mode==='dark'?'white':'black'
                        },
                        color:'#2ad4d7'}} onClick={onClose}>
                            <Link
                                to={`/payment?heading=${encodeURIComponent(
                                    destination?.heading
                                )}&description=${encodeURIComponent(destination?.description)}`}
                                style={{ textDecoration: "none", color: "inherit" }}
                            >
                                <Typography  style={{ wordBreak: 'break-word', whiteSpace: 'normal' }}>{destination.heading}</Typography>
                            </Link>
                        </MenuItem>
                        {index < filteredDestinations.length - 1 && (
                            <Divider sx={{ backgroundColor: mode==='dark'?'white':"black", my: 0.5 }} />
                        )}
                    </Box>
                ))
            ) : (
                <MenuItem disabled>
                    <Typography>No trips available</Typography>
                </MenuItem>
            )}
        </Menu>
    );
};

export default Itenary;
