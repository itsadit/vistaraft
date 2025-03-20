import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, Button, Typography, Slide } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useTheme } from '../ThemeContext/ThemeContext';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function BottomRightDialog() {
  const mode = useTheme();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
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
          minWidth: 'auto'
        }}
      >
        <WhatsAppIcon fontSize="large" />
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        PaperProps={{
          style: {
            position: 'fixed',
            bottom: 20,
            right: 20,
            margin: 0,
            borderRadius: '16px',
            padding: '20px',
            backgroundColor: mode === 'light' ? 'white' : '#121212',
          },
        }}
      >
        <DialogTitle>
          <Typography variant="h5" style={{ color: '#2196F3', fontWeight: 'bold' }}>Contact Us</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" style={{ marginBottom: '10px', color: mode === 'light' ? 'black' : 'white' }}>
            <strong>Mobile Number:</strong> +91 12345 67890
          </Typography>
          <Typography variant="body1" style={{ marginBottom: '10px',color: mode === 'light' ? 'black' : 'white' }}>
            <strong>WhatsApp:</strong> +91 98765 43210
          </Typography>
          <Typography variant="body1" style={{color: mode === 'light' ? 'black' : 'white'}}>
            <strong>Gmail:</strong> example@gmail.com
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
}
