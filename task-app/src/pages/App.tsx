import React from "react";
import { Route, Routes } from "react-router-dom"
import { Login } from "./Login";
import Home from "./Home";
import { PrivateRoute } from "../components/PrivateRoute"

export default class App extends React.Component {
        render() {
        return (
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path='/' element={<PrivateRoute component={Home}/>} />
                {/* <PrivateRoute path="/" element={<Home />} isAuthenticated={isLoggedIn} /> */}
            </Routes>
        );
    }
}