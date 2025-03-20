import React from 'react'
import { useTheme } from '../ThemeContext/ThemeContext'
function ModeBtn() {
    const { mode, themeToggler } = useTheme();
  return (
    <button
  onClick={themeToggler}
  className={`w-12 h-12 rounded-full flex justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 hover:!bg-gray-300 ${
    mode === 'dark' ? '!bg-white !text-gray-800' : '!bg-black!text-gray-800 '
  }`}
  style={{
    position: 'fixed',
    bottom: 20,
    left: 20,
    zIndex: 100,
    borderRadius: '50%',
     // Ensuring it's a circle using inline style
  }}
><span>{mode === 'dark' ? '☀️' : '🌙'}</span>
</button>
  )
}

export default ModeBtn