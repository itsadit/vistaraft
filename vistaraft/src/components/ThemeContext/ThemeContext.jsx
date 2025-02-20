import React, { useContext, useState } from "react";

const ThemeContext = React.createContext();
export const useTheme = () => {
  return useContext(ThemeContext);
}
export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("light");
  const themeToggler = () => {
    mode === "light" ? setMode("dark") : setMode("light");
  };
  return (
    <ThemeContext.Provider value={{ mode, themeToggler }}>
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeProvider;
