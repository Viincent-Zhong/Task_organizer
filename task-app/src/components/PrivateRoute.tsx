import React from "react";
import { useNavigate } from "react-router-dom"
import { isLoggedIn } from "../services/Auth"

export const PrivateRoute = ({component: Component}) => {
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!isLoggedIn()) {
            navigate('/login');
        }
    })

    return (
        <div>
            <Component/>
        </div>
    );
};