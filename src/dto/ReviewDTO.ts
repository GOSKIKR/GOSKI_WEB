export interface Tag {
    tagReviewId: number;
    tagName: string;
}

export interface ReviewDTO {
    reviewId: number;
    rating: number;
    content: string;
    createdAt: string;
    instructorTags: Tag[];
}

export interface InstructorReviewDTO {
    reviewId : number;
    lessonId : number;
    lessonDate : Date;
    lessonTimeInfo : string;
    rating : number;
    content : string;
    createdAt : Date;
    instructorTags: Tag[];
}