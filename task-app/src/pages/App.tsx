import React from "react";
import { Route, Routes } from "react-router-dom"
import Login from "./Login";
import Home from "./Home";

export default class App extends React.Component {
        render() {
        return (
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
            </Routes>
        );
    }
}