import React from "react";

const LessonFeeInfoModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
            <div className="bg-white rounded-lg p-6 w-[400px] max-h-[80vh]" onClick={(e) => e.stopPropagation()}>
                <div className="text-lg text-center font-bold mb-4">강습비 계산 안내</div>
                <div className="content bg-primary-100 p-4 rounded-lg overflow-y-auto max-h-[50vh]">
                    <div className="mb-4">강습비 관련 정보</div>
                    <div className="mb-4">강습 단계 별 비용 관련 정보</div>
                    <div className="mb-4">인원 수별 강습비 관련 정보</div>
                    <div className="mb-4">그 외 필요한 정보들</div>
                    <div className="mb-4">추가 정보 1</div>
                    <div className="mb-4">추가 정보 2</div>
                    <div className="mb-4">추가 정보 3</div>
                    <div className="mb-4">추가 정보 4</div>
                    <div className="mb-4">추가 정보 5</div>
                    <div className="mb-4">추가 정보 6</div>
                    <div className="mb-4">추가 정보 7</div>
                    <div className="mb-4">추가 정보 8</div>
                </div>
                <div className="flex justify-center">
                    <button 
                        className="mt-4 bg-primary-700 text-white px-4 py-2 rounded" 
                        onClick={onClose}>
                        돌아가기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LessonFeeInfoModal;
