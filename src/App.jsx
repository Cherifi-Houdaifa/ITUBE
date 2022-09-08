import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Upload from "./pages/Upload";

export default function App () {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/upload" element={<Upload />} />
            </Routes>
        </Router>
    )
}