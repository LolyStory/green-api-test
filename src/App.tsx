import React from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import { ChatWindow } from "./pages/Chat";
import { LoginWindow } from "./pages/Login";

function App() {
    return (
        <Routes>
            <Route path="/" element={<LoginWindow />} />
            <Route path="/chat" element={<ChatWindow />} />
        </Routes>
    );
}

export default App;
