import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { isLoggedIn } from "../services/Auth"

export const PrivateRoute = ({component: Component}) => {
    const navigate = useNavigate();
    const [logged, setLogged] = useState(false);

    useEffect(() => {
        if (!isLoggedIn()) {
            navigate('/login');
        } else
            setLogged(true)
    }, [])

    return (
        <div>
            {logged === true ? <Component/> : ""
            }
        </div>
    );
};