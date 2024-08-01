import React from "react";

interface AgreementFormProps {
    agreements: {
        personalInfo: boolean;
        thirdParty: boolean;
        marketing: boolean;
    };
    handleAgreementChange: (
        field: "personalInfo" | "thirdParty" | "marketing",
        value: boolean
    ) => void;
    handleAgreeAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AgreementForm: React.FC<AgreementFormProps> = ({
    agreements,
    handleAgreementChange,
    handleAgreeAll,
}) => {
    return (
        <div className="bg-primary-50 p-5 rounded-lg shadow-md">
            <div className="font-bold mb-2">약관 동의</div>
            <div className="flex flex-col space-y-1">
                <div className="text-sm text-gray-600 flex flex-row items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={agreements.personalInfo}
                        onChange={(e) =>
                            handleAgreementChange(
                                "personalInfo",
                                e.target.checked
                            )
                        }
                    />{" "}
                    <div>[필수] 개인정보 수집 및 이용</div>
                </div>
                <div className="text-sm text-gray-600 flex flex-row items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={agreements.thirdParty}
                        onChange={(e) =>
                            handleAgreementChange(
                                "thirdParty",
                                e.target.checked
                            )
                        }
                    />{" "}
                    <div>[필수] 개인정보 제 3자 제공</div>
                </div>
                <div className="text-sm text-gray-600 flex flex-row items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={agreements.marketing}
                        onChange={(e) =>
                            handleAgreementChange("marketing", e.target.checked)
                        }
                    />{" "}
                    <div>[선택] 마케팅 수신 동의</div>
                </div>
                <div className="text-sm text-black flex flex-row items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={
                            agreements.personalInfo &&
                            agreements.thirdParty &&
                            agreements.marketing
                        }
                        onChange={handleAgreeAll}
                    />{" "}
                    <div>전체 동의하기</div>
                </div>
            </div>
        </div>
    );
};

export default AgreementForm;
