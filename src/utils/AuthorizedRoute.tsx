import React from "react";
import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getRole } from "./getRole";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const Modal = ({ isOpen, onClose }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col justify-center">
            <p className="text-lg font-semibold">접근 권한이 없습니다.</p>
            <button
                onClick={onClose}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
                확인
            </button>
            </div>
        </div>
    );
};

type AuthorizedRouteProps = {
    allowedRoles : string[];
}

const AuthorizedRoute : React.FC<AuthorizedRouteProps> = ({allowedRoles}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const role = getRole();
        console.log(role)
        if ((!allowedRoles.includes(role))) {
            setIsAuthenticated(false);
            setShowModal(true);
        }
    }, []);

    const handleCloseModal = () => {
        setShowModal(false);
        navigate(-1);
    };

    if (!isAuthenticated) {
        return <Modal isOpen={showModal} onClose={handleCloseModal} />;
    }

    return <Outlet />;
};

export default AuthorizedRoute;
