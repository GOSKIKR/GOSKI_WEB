export interface StudentInfo {
    height: string;
    weight: string;
    footSize: number;
    age: string;
    gender: string;
    name: string;
}

export interface LessonData {
    teamId: number;
    instId: number;
    lessonDate: string;
    startTime: string;
    duration: number;
    peopleNumber: number;
    lessonType: string;
    basicFee: number;
    designatedFee: number;
    peopleOptionFee: number;
    levelOptionFee: number;
    requestComplain: string;
    coupon_id?: number;
    studentInfo: StudentInfo[];
}
