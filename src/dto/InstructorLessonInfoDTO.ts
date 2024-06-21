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
    resortName: string;
    lessonDate: string;
    startTime: string;
    duration: number;
    lessonStatus: string; // notStart / onGoing / lessonFinished / yesFeedback / cancelLesson / unknownStatus
    representativeName: string;
    isDesignated: number;
    studentCount: number;
    studentInfo: StudentInfo[];
}

export const dummyInstructorLessonData: InstructorLessonInfoDTO[] = [
  // notStart
  {
    userId: 1,
    isFinished: false,
    messageAvailable: true,
    lessonId: 101,
    teamId: 10,
    teamName: "고승민의 스키교실",
    resortName: "알프스 리조트",
    lessonDate: "2024-07-25",
    startTime: "09:00",
    duration: 2,
    lessonStatus: "notStart",
    representativeName: "고승민",
    isDesignated: 1,
    studentCount: 2,
    studentInfo: [
      {
        studentInfoId: 1001,
        name: "홍길동",
        height: "170cm",
        weight: "65kg",
        footSize: 260,
        age: "25",
        gender: "남"
      },
      {
        studentInfoId: 1002,
        name: "김영희",
        height: "160cm",
        weight: "50kg",
        footSize: 240,
        age: "23",
        gender: "여"
      }
    ]
  },
  {
    userId: 2,
    isFinished: false,
    messageAvailable: true,
    lessonId: 102,
    teamId: 10,
    teamName: "고승민의 스키교실",
    resortName: "알프스 리조트",
    lessonDate: "2024-07-26",
    startTime: "10:00",
    duration: 2,
    lessonStatus: "notStart",
    representativeName: "고승민",
    isDesignated: 1,
    studentCount: 1,
    studentInfo: [
      {
        studentInfoId: 1003,
        name: "박철수",
        height: "180cm",
        weight: "75kg",
        footSize: 270,
        age: "28",
        gender: "남"
      }
    ]
  },

  // onGoing
  {
    userId: 3,
    isFinished: false,
    messageAvailable: true,
    lessonId: 103,
    teamId: 11,
    teamName: "유제훈의 스키교실",
    resortName: "베어 마운틴 리조트",
    lessonDate: "2024-07-20",
    startTime: "10:00",
    duration: 2,
    lessonStatus: "onGoing",
    representativeName: "유제훈",
    isDesignated: 1,
    studentCount: 1,
    studentInfo: [
      {
        studentInfoId: 1004,
        name: "이민호",
        height: "175cm",
        weight: "70kg",
        footSize: 265,
        age: "30",
        gender: "남"
      }
    ]
  },
  {
    userId: 4,
    isFinished: false,
    messageAvailable: true,
    lessonId: 104,
    teamId: 11,
    teamName: "유제훈의 스키교실",
    resortName: "베어 마운틴 리조트",
    lessonDate: "2024-07-21",
    startTime: "11:00",
    duration: 2,
    lessonStatus: "onGoing",
    representativeName: "유제훈",
    isDesignated: 1,
    studentCount: 2,
    studentInfo: [
      {
        studentInfoId: 1005,
        name: "최영희",
        height: "165cm",
        weight: "55kg",
        footSize: 250,
        age: "27",
        gender: "여"
      },
      {
        studentInfoId: 1006,
        name: "김철수",
        height: "180cm",
        weight: "80kg",
        footSize: 280,
        age: "29",
        gender: "남"
      }
    ]
  },
  // lessonFinished
  {
    userId: 5,
    isFinished: true,
    messageAvailable: true,
    lessonId: 105,
    teamId: 12,
    teamName: "송준석의 스키교실",
    resortName: "화이트 리조트",
    lessonDate: "2024-07-19",
    startTime: "09:00",
    duration: 2,
    lessonStatus: "lessonFinished",
    representativeName: "송준석",
    isDesignated: 1,
    studentCount: 3,
    studentInfo: [
      {
        studentInfoId: 1007,
        name: "홍길동",
        height: "170cm",
        weight: "65kg",
        footSize: 260,
        age: "25",
        gender: "남"
      },
      {
        studentInfoId: 1008,
        name: "김영희",
        height: "160cm",
        weight: "50kg",
        footSize: 240,
        age: "23",
        gender: "여"
      },
      {
        studentInfoId: 1009,
        name: "이민호",
        height: "175cm",
        weight: "70kg",
        footSize: 265,
        age: "30",
        gender: "남"
      }
    ]
  },
  {
    userId: 6,
    isFinished: true,
    messageAvailable: true,
    lessonId: 106,
    teamId: 12,
    teamName: "송준석의 스키교실",
    resortName: "화이트 리조트",
    lessonDate: "2024-07-20",
    startTime: "10:00",
    duration: 2,
    lessonStatus: "lessonFinished",
    representativeName: "송준석",
    isDesignated: 1,
    studentCount: 2,
    studentInfo: [
      {
        studentInfoId: 1010,
        name: "박철수",
        height: "180cm",
        weight: "75kg",
        footSize: 270,
        age: "28",
        gender: "남"
      },
      {
        studentInfoId: 1011,
        name: "최영희",
        height: "165cm",
        weight: "55kg",
        footSize: 250,
        age: "27",
        gender: "여"
      }
    ]
  },

  // yesFeedback
  {
    userId: 7,
    isFinished: true,
    messageAvailable: true,
    lessonId: 107,
    teamId: 13,
    teamName: "김태훈의 스키교실",
    resortName: "블루 리조트",
    lessonDate: "2024-07-18",
    startTime: "09:00",
    duration: 2,
    lessonStatus: "yesFeedback",
    representativeName: "김태훈",
    isDesignated: 1,
    studentCount: 1,
    studentInfo: [
      {
        studentInfoId: 1012,
        name: "김철수",
        height: "180cm",
        weight: "80kg",
        footSize: 280,
        age: "29",
        gender: "남"
      }
    ]
  },
  {
    userId: 8,
    isFinished: true,
    messageAvailable: true,
    lessonId: 108,
    teamId: 13,
    teamName: "김태훈의 스키교실",
    resortName: "블루 리조트",
    lessonDate: "2024-07-19",
    startTime: "10:00",
    duration: 2,
    lessonStatus: "yesFeedback",
    representativeName: "김태훈",
    isDesignated: 1,
    studentCount: 2,
    studentInfo: [
      {
        studentInfoId: 1013,
        name: "홍길동",
        height: "170cm",
        weight: "65kg",
        footSize: 260,
        age: "25",
        gender: "남"
      },
      {
        studentInfoId: 1014,
        name: "김영희",
        height: "160cm",
        weight: "50kg",
        footSize: 240,
        age: "23",
        gender: "여"
      }
    ]
  },
  // Add 3 more yesFeedback lesson data...

  // cancelLesson
  {
    userId: 9,
    isFinished: true,
    messageAvailable: true,
    lessonId: 109,
    teamId: 14,
    teamName: "임종율의 스키교실",
    resortName: "그린 리조트",
    lessonDate: "2024-07-17",
    startTime: "08:00",
    duration: 2,
    lessonStatus: "cancelLesson",
    representativeName: "임종율",
    isDesignated: 1,
    studentCount: 1,
    studentInfo: [
      {
        studentInfoId: 1015,
        name: "이민호",
        height: "175cm",
        weight: "70kg",
        footSize: 265,
        age: "30",
        gender: "남"
      }
    ]
  },
  {
    userId: 10,
    isFinished: true,
    messageAvailable: true,
    lessonId: 110,
    teamId: 14,
    teamName: "임종율의 스키교실",
    resortName: "그린 리조트",
    lessonDate: "2024-07-18",
    startTime: "09:00",
    duration: 2,
    lessonStatus: "cancelLesson",
    representativeName: "임종율",
    isDesignated: 1,
    studentCount: 2,
    studentInfo: [
      {
        studentInfoId: 1016,
        name: "박철수",
        height: "180cm",
        weight: "75kg",
        footSize: 270,
        age: "28",
        gender: "남"
      },
      {
        studentInfoId: 1017,
        name: "최영희",
        height: "165cm",
        weight: "55kg",
        footSize: 250,
        age: "27",
        gender: "여"
      }
    ]
  },
  // Add 3 more cancelLesson lesson data...

  // unknownStatus
  {
    userId: 11,
    isFinished: false,
    messageAvailable: false,
    lessonId: 111,
    teamId: 15,
    teamName: "홍길동의 스키교실",
    resortName: "레드 리조트",
    lessonDate: "2024-07-16",
    startTime: "08:00",
    duration: 2,
    lessonStatus: "unknownStatus",
    representativeName: "홍길동",
    isDesignated: 1,
    studentCount: 3,
    studentInfo: [
      {
        studentInfoId: 1018,
        name: "김영희",
        height: "160cm",
        weight: "50kg",
        footSize: 240,
        age: "23",
        gender: "여"
      },
      {
        studentInfoId: 1019,
        name: "이민호",
        height: "175cm",
        weight: "70kg",
        footSize: 265,
        age: "30",
        gender: "남"
      },
      {
        studentInfoId: 1020,
        name: "박철수",
        height: "180cm",
        weight: "75kg",
        footSize: 270,
        age: "28",
        gender: "남"
      }
    ]
  },
  {
    userId: 12,
    isFinished: false,
    messageAvailable: false,
    lessonId: 112,
    teamId: 15,
    teamName: "홍길동의 스키교실",
    resortName: "레드 리조트",
    lessonDate: "2024-07-17",
    startTime: "09:00",
    duration: 2,
    lessonStatus: "unknownStatus",
    representativeName: "홍길동",
    isDesignated: 1,
    studentCount: 1,
    studentInfo: [
      {
        studentInfoId: 1021,
        name: "최영희",
        height: "165cm",
        weight: "55kg",
        footSize: 250,
        age: "27",
        gender: "여"
      }
    ]
  },
  // Add 3 more unknownStatus lesson data...
];
