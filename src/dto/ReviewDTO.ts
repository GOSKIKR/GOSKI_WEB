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