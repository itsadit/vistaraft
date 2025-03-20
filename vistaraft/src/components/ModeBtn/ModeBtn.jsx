import React from 'react'
import { useTheme } from '../ThemeContext/ThemeContext'
function ModeBtn() {
    const { mode, themeToggler } = useTheme();
  return (
    <button
            onClick={themeToggler}
            className={` rounded-lg transition-all ${mode === 'light' ? 'bg-gray-200 hover:bg-gray-300' : 'bg-gray-700 hover:bg-gray-800'} ${mode === 'dark' ? 'text-white' : 'text-gray-800'} duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500`}
          style={{position: 'fixed', top:20, right:20,zIndex:0}}
          >
            {mode === 'dark' ? '☀️' : '🌙'}
          </button>
  )
}

export default ModeBtn