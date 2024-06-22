import React from "react";
import ContextProvider, { Context } from "./context/ChatContext";
import Sidebar from "./components/Sidebar";
import Main from "./components/main";
import "./App.css";
import "tailwindcss/tailwind.css";
import "./index.css";

const App = () => {
  return (
    <ContextProvider>
      <Main />
      <Sidebar />
    </ContextProvider>
  );
};

export default App;
