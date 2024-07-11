export interface MediaDTO {
    mediaId: number;
    mediaUrl: string;
}

export interface FeedbackDataDTO {
    feedbackId: number;
    content: string;
    images: MediaDTO[];
    videos: MediaDTO[];
}
