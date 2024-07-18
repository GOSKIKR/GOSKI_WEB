import React from "react";

interface PaymentMethodFormProps {
    paymentMethod: { kakao: boolean; naver: boolean };
    handlePaymentChange: (field: "kakao" | "naver", value: boolean) => void;
}

const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({
    paymentMethod,
    handlePaymentChange,
}) => {
    return (
        <div className="bg-primary-50 p-5 rounded-lg shadow-md">
            <div className="font-bold mb-2">결제 방법</div>
            <div className="flex flex-row">
                <div className="flex flex-row items-center">
                    <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod.kakao}
                        onChange={(e) =>
                            handlePaymentChange("kakao", e.target.checked)
                        }
                    />{" "}
                    <img
                        src="/assets/images/kakaoPay.png"
                        className="py-2 ml-4 h-2/3 w-auto"
                    />
                </div>
                <div className="flex flex-row items-center">
                    <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod.naver}
                        onChange={(e) =>
                            handlePaymentChange("naver", e.target.checked)
                        }
                    />{" "}
                    <img
                        src="/assets/images/naverPay.png"
                        className="py-2 ml-4 h-2/3 w-auto"
                    />
                </div>
            </div>
        </div>
    );
};

export default PaymentMethodForm;
