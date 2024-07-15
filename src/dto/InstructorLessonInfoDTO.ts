export interface StudentInfo {
    studentInfoId: number;
    name: string;
    height: string;
    weight: string;
    footSize: number;
    age: string;
    gender: string;
}

export interface InstructorLessonInfoDTO {
    userId: number; // 강습 예약한 사람 ID
    isFinished: boolean;
    messageAvailable: boolean;
    lessonId: number;
    teamId: number;
    teamName: string;
    profileUrl: string;
    resortName: string;
    lessonDate: string;
    startTime: string;
    duration: number;
    lessonStatus: string; // notStart / onGoing / lessonFinished / yesFeedback / cancelLesson / unknownStatus
    representativeName: string;
    isDesignated: number;
    studentCount: number;
    studentInfoResponseDTOs: StudentInfo[];
}
