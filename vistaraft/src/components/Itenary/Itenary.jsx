import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Menu,
    MenuItem,
    Divider,
    Typography,
    Box
} from '@mui/material';

const Itenary = ({ isDropdownOpen, anchorEl, onClose }) => {
    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_HOST}/api/destinations`);
                const data = await response.json();
                setDestinations(data);
            } catch (error) {
                console.error('Error fetching destinations:', error);
            }
        };

        fetchDestinations();
    }, []);

    return (
        <Menu
            anchorEl={anchorEl}
            open={isDropdownOpen}
            onClose={onClose}
            PaperProps={{
                sx: { width: 250, p: 1 }
            }}
        >
            {destinations.length > 0 ? (
                destinations.map((destination, index) => (
                    <Box key={destination._id}>
                        <MenuItem onClick={onClose}>
                            <Link to={`/payment?heading=${encodeURIComponent(destination?.heading)}&description=${encodeURIComponent(destination?.description)}`}><Typography>{destination.heading}</Typography></Link>
                        </MenuItem>
                        {index < destinations.length - 1 && (
                            <Divider sx={{ backgroundColor: 'black', my: 0.5 }} />
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
