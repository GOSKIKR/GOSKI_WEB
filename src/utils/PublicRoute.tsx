import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const PublicRoute: React.FC = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        if (sessionStorage.getItem("accesstoken")) {
            navigate(-1);
        }
    }, [navigate]);

    return sessionStorage.getItem("accesstoken") ? null : <Outlet />;
};

export default PublicRoute;