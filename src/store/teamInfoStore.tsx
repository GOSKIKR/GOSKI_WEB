import { create } from "zustand";

import { TeamsFilterResult } from "../interface/ReservationTypes";

type teamInfo = {
  teamId: number;
  teamName: string;
  description: string;
  cost: number;
  teamProfileUrl: string;
  rating: number;
  instructors: number[];
  teamImages: {
    teamImageId: number;
    imageUrl: string;
  }[];
  basicFee: number;
  peopleOptionFee: number;
  designatedFee: number;
  levelOptionFee: number;
  lessonType: string;
  reviewCount: number;
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

interface teamInfoStoreState extends teamInfo {
  setTeamInfo: (teams: TeamsFilterResult) => void;
}

const teamInfoStore = create<teamInfoStoreState>((set) => ({
  // 초기 상태
  teamId: 0,
  teamName: "",
  description: "",
  cost: 0,
  teamProfileUrl: "",
  rating: 0,
  instructors: [],
  teamImages: [],
  basicFee: 0,
  peopleOptionFee: 0,
  designatedFee: 0,
  levelOptionFee: 0,
  lessonType: "",
  reviewCount: 0,
  reviews: [],

  // 상태 업데이트 함수
  setTeamInfo: ({
    teamId,
    teamName,
    description,
    cost,
    teamProfileUrl,
    rating,
    instructors,
    teamImages,
    basicFee,
    peopleOptionFee,
    designatedFee,
    levelOptionFee,
    lessonType,
    reviewCount,
    reviews,
  }: TeamsFilterResult) =>
    set({
      teamId,
      teamName,
      description,
      cost,
      teamProfileUrl,
      rating,
      instructors,
      teamImages,
      basicFee,
      peopleOptionFee,
      designatedFee,
      levelOptionFee,
      lessonType,
      reviewCount,
      reviews,
    }),
}));

export default teamInfoStore;
