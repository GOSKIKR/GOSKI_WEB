export interface CertificateInfo {
    certificateId: number;
    certificateName: string;
    certificateType: string;
    certificateImageUrl: string;
}

export interface Instructor {
    instructorId: number;
    userName: string;
    teamId: number;
    teamName: string;
    position: string;
    description: string;
    instructorUrl: string;
    gender: string;
    certificateInfo: CertificateInfo[];
    rating: number;
    reviewCount: number;
    cost: number;
    basicFee: number;
    peopleOptionFee: number;
    designatedFee: number;
    levelOptionFee: number;
    lessonType: string;
    reviews: any[];
}
