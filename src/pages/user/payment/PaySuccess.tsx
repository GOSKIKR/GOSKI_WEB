import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavbarUser from "../../../components/common/NavbarUser";

const PaySuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { approved_at, item_name } = location.state || {};

    const handleGoHome = () => {
        navigate("/");
    };

    const handleGoToMyPage = () => {
        navigate("/user/my");
    };

    return (
        <div>
            <NavbarUser />
            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 py-12">
                <div className="bg-white shadow-md rounded-lg p-8 max-w-lg mx-auto">
                    <h2 className="text-2xl font-bold text-center mb-4">
                        예약 완료
                    </h2>
                    <p className="text-gray-700 text-center">
                        결제가 성공적으로 완료되었습니다.
                    </p>
                    <p className="text-gray-700 text-center">
                        결제 및 예약 관련 자세한 정보는
                    </p>
                    <p className="text-gray-700 text-center mb-6">
                        마이페이지 예약 목록에서 확인할 수 있습니다.
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg mb-6">
                        <p className="text-gray-700 text-center">
                            <strong>승인 일시:</strong> {approved_at}
                        </p>
                        <p className="text-gray-700 text-center">
                            <strong>상품명:</strong> {item_name}
                        </p>
                    </div>
                    <div className="flex justify-around">
                        <button
                            onClick={handleGoHome}
                            className="bg-primary-500 text-white w-30 py-2 px-4 rounded hover:bg-primary-100 hover:text-black transition duration-200"
                        >
                            홈으로 가기
                        </button>
                        <button
                            onClick={handleGoToMyPage}
                            className="bg-primary-100 text-black w-30 py-2 px-4 rounded hover:bg-primary-400 hover:text-white transition duration-200"
                        >
                            예약 목록으로 가기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaySuccess;
