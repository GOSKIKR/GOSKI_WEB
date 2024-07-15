import { create } from "zustand";

type instructorInfo = {
  instructorId: number;
  userName: string;
  teamId: number;
  teamName: string;
  position: string;
  description: string;
  instructorUrl: string;
  gender: string;
  certificateInfo: {
    certificateId: number;
    certificateName: string;
    certificateType: string;
    certificateImageUrl: string;
  }[];
  rating: number;
  reviewCount: number;
  cost: number;
  basicFee: number;
  peopleOptionFee: number;
  designatedFee: number;
  levelOptionFee: number;
  lessonType: string;
  reviews: {
    reviewId: number;
    rating: number;
    content: string;
    createdAt: string;
    instructorTags: {
      tagReviewId: number;
      tagName: string;
    }[];
  }[];
};

interface instructorInfoStoreState extends instructorInfo {
  setInstructorInfo: (instructors: instructorInfo) => void;
}

const instructorInfoStore = create<instructorInfoStoreState>((set) => ({
  // 초기 상태 설정
  instructorId: 0,
  userName: "",
  teamId: 0,
  teamName: "",
  position: "",
  description: "",
  instructorUrl: "",
  gender: "",
  certificateInfo: [],
  rating: 0,
  reviewCount: 0,
  cost: 0,
  basicFee: 0,
  peopleOptionFee: 0,
  designatedFee: 0,
  levelOptionFee: 0,
  lessonType: "",
  reviews: [],

  // 상태 업데이트 함수
  setInstructorInfo: (instructor: instructorInfo) => set(instructor),
}));

export default instructorInfoStore;
