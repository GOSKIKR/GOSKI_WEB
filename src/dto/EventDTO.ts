export interface Event {
    resortId: number;
    studentCount: number;
    lessonDate: string;
    startTime: string;
    duration: number;
    lessonType: string;
    lessonId: number;
    teamId: number;
    teamName: string;
    resortName: string;
    studentInfoDTOs: StudentInfoDTO[];
    representativeName: string;
    isDesignated: boolean;
    instructorId: number;
}

export interface StudentInfoDTO {
    height: string;
    weight: string;
    age: string;
    gender: string;
    name: string;
    foot_size: number;
}

export interface CreateEvent {
    teamId: number;
    instructorId: number;
    lessonType: string;
    level: string;
    lessonDate: string;
    startTime: string;
    duration: number;
    studentCount: number;
    userName: string;
    content: string;
}
