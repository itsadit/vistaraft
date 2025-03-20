import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, Button, Typography, Slide, IconButton } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useTheme } from '../ThemeContext/ThemeContext';
import { Link } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function BottomRightDialog() {
  const mode = useTheme();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {/* Floating WhatsApp Button */}
      <Button
        onClick={handleClickOpen}
        variant="contained"
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          borderRadius: '50%',
          width: 56,
          height: 56,
          backgroundColor: '#25D366',
          color: 'white',
          minWidth: 'auto',
        }}
      >
        <WhatsAppIcon fontSize="large" />
      </Button>

      {/* Contact Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        PaperProps={{
          style: {
            position: 'fixed',
            bottom: 100,
            right: 20,
            margin: 0,
            borderRadius: '16px',
            padding: '20px',
            backgroundColor: mode === 'light' ? '#ffffff' : '#1e1e1e',
            color: mode === 'light' ? 'black' : 'white',
          },
        }}
      >
        <DialogTitle>
          <Typography variant="h5" style={{ color: '#2196F3', fontWeight: 'bold' }}>Contact Us</Typography>
        </DialogTitle>
        <DialogContent>
          {/* Phone Number */}
          <Typography variant="body1" style={{ marginBottom: '10px', color: mode === 'light' ? '!black' : '!white' }}>
            <PhoneIcon style={{ marginRight: '8px' }} />
            <Link to={`tel:${import.meta.env.VITE_MOB}`} style={{ color: mode==='dark'?'!white':'!black', textDecoration: 'none' }}>+91-8384076491</Link>
          </Typography>


          {/* Email Address */}
          <Typography variant="body1" style={{ marginBottom: '10px', color: mode === 'light' ? '!black' : '!white' }}>
            <EmailIcon style={{ marginRight: '8px' }} />
            <Link to={`mailto:${import.meta.env.VITE_MAIL}`} style={{ color: mode==='dark'?'!white':'!black', textDecoration: 'none' }}>travelwithvistaraft@gmail.com</Link>
          </Typography>

          {/* Social Media Links */}
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
            <IconButton component="a" href={import.meta.env.VITE_INSTA} target="_blank" style={{ color: '#E1306C' }}>
              <InstagramIcon fontSize="large" />
            </IconButton>
            <IconButton component="a" href={import.meta.env.VITE_FB} target="_blank" style={{ color: '#1877F2' }}>
              <FacebookIcon fontSize="large" />
            </IconButton>
            <IconButton component="a" href={`https://wa.me/${import.meta.env.VITE_MOB}`} target="_blank" style={{ color: '#25D366' }}>
              <WhatsAppIcon fontSize="large" />
            </IconButton>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
