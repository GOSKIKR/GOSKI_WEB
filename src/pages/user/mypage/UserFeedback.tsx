import React, { useEffect, useState } from 'react';

interface Media {
  mediaId: number;
  mediaUrl: string;
}

interface FeedbackData {
  feedbackId: number;
  content: string;
  images: Media[];
  videos: Media[];
}

const dummyFeedbackData: FeedbackData = {
  feedbackId: 4,
  content: "강습 피드백입니다 강습 피드백입니다 강습 피드백입니다 강습 피드백입니다 강습 피드백입니다 강습 피드백입니다 강습 피드백입니다 강습 피드백입니다 강습 피드백입니다 강습 피드백입니다 강습 피드백입니다 강습 피드백입니다 강습 피드백입니다 강습 피드백입니다 강습 피드백입니다",
  images: [
    {
      mediaId: 10,
      mediaUrl: "https://go-ski.s3.ap-northeast-2.amazonaws.com/feedback/images/f8f09ac7-a37c-48df-92b6-0a404bbf7ef3.jpeg"
    },
    {
      mediaId: 11,
      mediaUrl: "https://go-ski.s3.ap-northeast-2.amazonaws.com/feedback/images/f66529d8-7526-4426-950c-0487f65f8515.png"
    }
  ],
  videos: [
    {
      mediaId: 12,
      mediaUrl: "https://go-ski.s3.ap-northeast-2.amazonaws.com/feedback/videos/c74bbd1a-cb7f-48ae-a27e-e3d308b1eaf5.mp4"
    }
  ]
};

const UserFeedback = () => {
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);

  useEffect(() => {
    // 여기서 실제 API 호출을 통해 데이터를 가져옵니다.
    // const fetchFeedback = async () => {
    //   try {
    //     const response = await fetch('/path-to-your-api'); // API 엔드포인트를 설정합니다.
    //     const result = await response.json();
    //     if (result.status === 'success') {
    //       setFeedback(result.data);
    //     }
    //   } catch (error) {
    //     console.error('Error fetching feedback:', error);
    //   }
    // };

    // fetchFeedback();
    
    // Use dummy data instead of API call
    setFeedback(dummyFeedbackData);
  }, []);

  if (!feedback) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-col w-full h-screen pl-12 items-start'>
      <div className='pt-12 pb-12 font-extrabold text-black text-2xl'>피드백 확인</div>
      <div className='flex flex-col bg-primary-50 w-4/5 rounded-lg shadow-md items-center py-12 space-y-10'>
        <div className='w-4/5'>
          <div className='bg-white p-5 rounded-lg shadow-md mb-6'>
            <div className='font-bold mb-2'>강습 예약 정보</div>
            <div>장소: 곤지암리조트</div>
            <div>팀: 고승민의 스키교실</div>
            <div>일시: 2024.00.00(목) 15:00 - 17:00</div>
            <div>강습: 1:2 스키</div>
          </div>
          <div className='bg-white p-5 rounded-lg shadow-md mb-6'>
            <div className='font-bold mb-2'>강습 피드백 내용</div>
            <div>{feedback.content}</div>
          </div>
          <div className='bg-white p-5 rounded-lg shadow-md mb-6'>
            <div className='font-bold mb-2'>동영상 ({feedback.videos.length})</div>
            <div className='flex space-x-4'>
              {feedback.videos.map((video) => (
                <div key={video.mediaId} className='w-1/3'>
                  <video className='w-full h-32' controls>
                    <source src={video.mediaUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <a href={video.mediaUrl} download className='block mt-2 text-center text-blue-500'>다운로드</a>
                </div>
              ))}
            </div>
          </div>
          <div className='bg-white p-5 rounded-lg shadow-md mb-6'>
            <div className='flex flex-row justify-between'>
                <div className='font-bold mb-2'>사진 ({feedback.images.length})</div>    
                <div className='bg-primary-500 text-white py-2 px-4 rounded-lg'>전체 다운로드</div>
            </div>  
            <div className='grid grid-cols-4 gap-4'>
              {feedback.images.map((image) => (
                <div key={image.mediaId} className='w-full'>
                  <img src={image.mediaUrl} alt='feedback' className='w-full h-32 object-cover' />
                  <a href={image.mediaUrl} download className='block mt-2 text-center text-blue-500'>다운로드</a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFeedback;
