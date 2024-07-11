export interface UserLessonDTO {
    lessonId: number;
    teamId: number;
    teamName: string;
    resortName: string;
    instructorId: number;
    instructorName: string;
    profileUrl: string;
    lessonDate: string; // Use string for simplicity
    lessonStatus: string;
    startTime: string;
    duration: number;
    hasReview: boolean;
    hasFeedback: boolean;
    studentCount: number;
}

export interface LessonPayment {
    cost: number;
    paybackRate: number;
}
