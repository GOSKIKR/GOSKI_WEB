export interface Resort {
  resortId: number;
  resortName: string;
  lessonType: string; //'SKI' | 'BOARD';
  studentCount: number;
  lessonDate: string; // 'YYYY-MM-DD';
  startTime: string; // 'hhmm';
  duration: number;
  level: string; //'beginner' | 'intermediate' | 'advanced'
}

export type ReserveData = {
  resortName: string;
  lessonType: string; //'SKI' | 'BOARD';
  studentCount: number;
  lessonDate: string; // 'YYYY-MM-DD';
  startTime: string; // 'hhmm';
  duration: number;
  level: string; //'beginner' | 'intermediate' | 'advanced'
};

export type TeamsFilterResult = {
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

export type InstructorsFilterResult = {
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
