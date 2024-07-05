import React, {useState, useEffect} from "react"
import { useLocation } from "react-router-dom";


const DropdownMenu: React.FC = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const location = useLocation();

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    }

    useEffect(() => {
        setDropdownVisible(false);
    },[location.pathname])

    return (
        <div className="relative mb-6 bg-primary-50 rounded-lg shadow-lg w-64">
            <div className="border-t text-center px-4 py-2 cursor-pointer" onClick={toggleDropdown}>
                팀 리스트 {dropdownVisible ? '▲' : '▼'}
            </div>
            {dropdownVisible && (
                <div className="absolute left-0 top-full text-center bg-primary-50 rounded-lg shadow-lg w-full z-1">
                    <div className="border-t px-4 py-2">고승민의 스키 교실</div>
                    <div className="border-t px-4 py-2">김태훈의 스키 교실</div>
                    <div className="border-t px-4 py-2">송준석의 스키 교실</div>
                </div>
            )}
        </div>
    );
}

export default DropdownMenu;
