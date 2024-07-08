import React, { useState } from "react";

interface Coupon {
    name: string;
    place: string;
    status: string;
    period: string;
    registrationDate: string;
}

const Coupon: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>("전체");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 10; // 페이지당 표시할 항목 수

    const dummyData: Coupon[] = [
        {
            name: "재강습 할인 쿠폰",
            place: "OO리조트",
            status: "사용 전",
            period: "2024.09.01 ~ 2025.09.01",
            registrationDate: "2024.08.19",
        },
        {
            name: "재강습 할인 쿠폰",
            place: "OO리조트",
            status: "사용 전",
            period: "2024.09.01 ~ 2025.09.01",
            registrationDate: "2024.08.19",
        },
        {
            name: "재강습 할인 쿠폰",
            place: "OO리조트",
            status: "사용 전",
            period: "2024.09.01 ~ 2025.09.01",
            registrationDate: "2024.08.19",
        },
        {
            name: "재강습 할인 쿠폰",
            place: "OO리조트",
            status: "사용 전",
            period: "2024.09.01 ~ 2025.09.01",
            registrationDate: "2024.08.19",
        },
    ];

    const filteredData = dummyData.filter((coupon) => {
        if (activeTab === "전체") return true;
        return coupon.status === activeTab;
    });

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const currentData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const renderCardContent = () => (
        <div className="block mt-4">
            {currentData.map((coupon, index) => (
                <div
                    key={index}
                    className="border border-gray-300 p-4 mb-4 rounded-lg"
                >
                    <div className="flex justify-between">
                        <div className="font-bold">{coupon.name}</div>
                        <input type="checkbox" />
                    </div>
                    <div className="text-sm text-gray-500 mb-2">10,000원</div>
                    <div className="mb-1">
                        <span className="font-semibold">사용처:</span>{" "}
                        {coupon.place}
                    </div>
                    <div className="mb-1">
                        <span className="font-semibold">상태:</span>{" "}
                        {coupon.status}
                    </div>
                    <div className="mb-1">
                        <span className="font-semibold">사용 기간:</span>{" "}
                        {coupon.period}
                    </div>
                    <div className="mb-1">
                        <span className="font-semibold">등록일:</span>{" "}
                        {coupon.registrationDate}
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div>
            <div className="container mx-auto p-4">
                <div className="mt-4">
                    <div className="flex space-x-4">
                        <div
                            className={`cursor-pointer ${
                                activeTab === "전체" ? "text-blue-500" : ""
                            }`}
                            onClick={() => setActiveTab("전체")}
                        >
                            전체({dummyData.length})
                        </div>
                        <div
                            className={`cursor-pointer ${
                                activeTab === "사용 전" ? "text-blue-500" : ""
                            }`}
                            onClick={() => setActiveTab("사용 전")}
                        >
                            사용 전(
                            {
                                dummyData.filter(
                                    (coupon) => coupon.status === "사용 전"
                                ).length
                            }
                            )
                        </div>
                        <div
                            className={`cursor-pointer ${
                                activeTab === "사용 완료" ? "text-blue-500" : ""
                            }`}
                            onClick={() => setActiveTab("사용 완료")}
                        >
                            사용 완료(
                            {
                                dummyData.filter(
                                    (coupon) => coupon.status === "사용 완료"
                                ).length
                            }
                            )
                        </div>
                    </div>
                    {renderCardContent()}
                </div>
                <div className="flex justify-center mt-4">
                    <div className="flex space-x-2">
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                className={`border p-1 px-2 rounded ${
                                    currentPage === index + 1
                                        ? "bg-blue-500 text-white"
                                        : ""
                                }`}
                                onClick={() => setCurrentPage(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Coupon;
