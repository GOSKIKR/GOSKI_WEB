import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiClient from "../../../utils/config/axiosConfig";

const PayApprove = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const pgToken = query.get("pg_token");
        console.log(pgToken);

        if (pgToken) {
            approvePayment(pgToken);
        }
    }, [location]);

    const approvePayment = async (pgToken: string) => {
        try {
            const cid = "TC0ONETIME";
            const tid = localStorage.getItem("tid");
            const partnerOrderId = "partnerOrderId";
            const partnerUserId = "partnerUserId";
            const accessToken = localStorage.getItem("accesstoken");
            const response = await apiClient().post(
                "/payment/reserve/approve",
                {
                    tid,
                    partnerOrderId,
                    partnerUserId,
                    pgToken,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            const { approved_at, item_name } = response.data.data;
            console.log("Payment approved:", response.data.data);
            navigate("/user/payment/success", {
                state: { approved_at, item_name },
            });
        } catch (error) {
            console.error("Error approving payment:", error);
            navigate("/user/payment/failure");
        }
    };

    return <div>결제 처리 중...</div>;
};

export default PayApprove;
