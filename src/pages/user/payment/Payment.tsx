import React, { useState, useTransition } from 'react';

interface StudentInfo {
  height: string;
  weight: string;
  footSize: number;
  age: string;
  gender: string;
  name: string;
}

interface LessonData {
  teamId: number;
  instId: number;
  lessonDate: string;
  startTime: string;
  duration: number;
  peopleNumber: number;
  lessonType: string;
  basicFee: number;
  designatedFee: number;
  peopleOptionFee: number;
  levelOptionFee: number;
  requestComplain: string;
  coupon_id?: number;
  studentInfo: StudentInfo[];
}

const initialData: LessonData = {
  teamId: 1,
  instId: 1,
  lessonDate: '2024-05-01',
  startTime: '1400',
  duration: 2,
  peopleNumber: 3,
  lessonType: '1010000',
  basicFee: 100000,
  designatedFee: 50000,
  peopleOptionFee: 30000,
  levelOptionFee: 20000,
  requestComplain: '',
  studentInfo: [
    { height: '', weight: '', footSize: 0, age: '', gender: '', name: '' },
    { height: '', weight: '', footSize: 0, age: '', gender: '', name: '' },
    { height: '', weight: '', footSize: 0, age: '', gender: '', name: '' }
  ]
};

const Payment = () => {
  const [data, setData] = useState(initialData);

  const handleInputChange = (index: number, field: keyof StudentInfo, value: string | number) => {
    const updatedStudentInfo = data.studentInfo.map((student, i) =>
      i === index ? { ...student, [field]: value } : student
    );
    setData({ ...data, studentInfo: updatedStudentInfo });
  };

  return (
    <div className='p-10'>
      <div className='text-2xl font-bold mb-8'>결제하기</div>
      <div className='flex flex-row space-x-5'>
        <div className='w-3/5 space-y-5'>
          <div className='bg-primary-50 p-5 rounded-lg shadow-md'>
            <div className='font-bold mb-2'>강습 예약 정보</div>
            <div>일시: {data.lessonDate}</div>
            <div>시간: {data.startTime}</div>
            <div>인원: {data.peopleNumber}명</div>
            <div>요청사항: {data.requestComplain || '없음'}</div>
          </div>
          <div className='bg-primary-50 p-5 rounded-lg shadow-md'>
            <div className='font-bold mb-2'>예약자 정보</div>
            <div>예약자: 김현지</div>
            <div>연락처: 010.0000.0000</div>
            <div>이메일: 김현지@gmail.com</div>
          </div>
          <div className='bg-primary-50 p-5 rounded-lg shadow-md'>
            <div className='font-bold mb-2'>강습 인원 정보</div>
            {data.studentInfo.map((student, index) => (
              <div key={index} className='mb-4 space-y-2 bg-white p-4 '>
                <div className='flex flex-row space-x-3'>
                    <div>
                        <input
                            type='text'
                            value={student.name}
                            onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                            className='border p-1 w-40 h-8 rounded bg-primary-100 placeholder:text-black'
                            placeholder='이름'
                        />
                    </div>
                    <div>
                        <select
                            value={student.age}
                            onChange={(e) => handleInputChange(index, 'age', e.target.value)}
                            className='border p-1 rounded bg-primary-100 w-40 h-8'
                            name='연령대'
                        >
                            <option value='select'>연령대</option>
                            <option value='1'>미취학 아동</option>
                            <option value='2'>10세~20세</option>
                            <option value='3'>21세~30세</option>
                            <option value='4'>31세~40세</option>
                            <option value='5'>41세~50세</option>
                            <option value='6'>51세~60세</option>
                            <option value='7'>61세~</option>
                        </select>
                    </div>
                    <div className='flex flex-row items-center justify-center text-center'>
                        <div className='w-20 h-8 rounded-l-lg bg-primary-200 border-gray-300 border-y-2 border-l-2'>남성</div>
                        <div className='w-20 h-8 rounded-r-lg border-gray-300 border-r-2 border-y-2'>여성</div>
                    </div>
                </div>
                <div>
                  <label>신장: </label>
                  <input
                    type='text'
                    value={student.height}
                    onChange={(e) => handleInputChange(index, 'height', e.target.value)}
                    className='border p-1 rounded'
                  />
                </div>
                <div>
                  <label>체중: </label>
                  <input
                    type='text'
                    value={student.weight}
                    onChange={(e) => handleInputChange(index, 'weight', e.target.value)}
                    className='border p-1 rounded'
                  />
                </div>
                <div>
                    <input
                        type='number'
                        value={student.footSize}
                        onChange={(e) => handleInputChange(index, 'footSize', Number(e.target.value))}
                        className='border p-1 w-40 h-8 rounded bg-primary-100 placeholder:text-black'
                        placeholder='신발 사이즈를 입력해주세요'
                    />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='w-2/5 space-y-5'>
          <div className='bg-primary-50 p-5 rounded-lg shadow-md'>
            <div className='font-bold mb-2'>최종 결제 금액</div>
            <div>기본 강습비: {data.basicFee.toLocaleString()}원</div>
            <div>레벨 옵션비: {data.levelOptionFee.toLocaleString()}원</div>
            <div>지정 강사비: {data.designatedFee.toLocaleString()}원</div>
            <div>총 결제 금액: {(data.basicFee + data.levelOptionFee + data.designatedFee).toLocaleString()}원</div>
          </div>
          <div className='bg-primary-50 p-5 rounded-lg shadow-md'>
            <div className='font-bold mb-2'>약관 동의</div>
            <div>
              <input type='checkbox' /> [필수] 개인정보 수집 및 이용
            </div>
            <div>
              <input type='checkbox' /> [필수] 개인정보 제 3자 제공
            </div>
            <div>
              <input type='checkbox' /> [선택] 마케팅 수신 동의
            </div>
          </div>
          <div className='bg-primary-50 p-5 rounded-lg shadow-md'>
            <div className='font-bold mb-2'>결제 방법</div>
            <button className='w-full py-2 bg-yellow-500 text-white rounded-lg mb-2'>카카오페이</button>
            <button className='w-full py-2 bg-green-500 text-white rounded-lg'>네이버페이</button>
          </div>
          <div className='bg-primary-500 p-5 rounded-lg shadow-md text-white text-center cursor-pointer'>
            예약하기
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
