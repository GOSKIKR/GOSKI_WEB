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
      lessonId: 1,
      teamId: 1,
      teamName: "팀A",
      resortName: "리조트1",
      lessonDate: "2024-07-01",
      startTime: "10:00",
      duration: 2,
      lessonStatus: "notStart",
      representativeName: "고승민",
      isDesignated: 1,
      studentCount: 3,
      studentInfo: [
          { studentInfoId: 1, name: "학생1", height: "150cm", weight: "45kg", footSize: 230, age: "10", gender: "M" },
      ]
  },
  {
      userId: 2,
      isFinished: false,
      messageAvailable: true,
      lessonId: 2,
      teamId: 1,
      teamName: "팀B",
      resortName: "리조트2",
      lessonDate: "2024-07-02",
      startTime: "11:00",
      duration: 2,
      lessonStatus: "notStart",
      representativeName: "김태훈",
      isDesignated: 1,
      studentCount: 2,
      studentInfo: [
          { studentInfoId: 2, name: "학생2", height: "160cm", weight: "50kg", footSize: 240, age: "12", gender: "F" },
      ]
  },
  {
      userId: 3,
      isFinished: false,
      messageAvailable: true,
      lessonId: 3,
      teamId: 1,
      teamName: "팀C",
      resortName: "리조트3",
      lessonDate: "2024-07-03",
      startTime: "12:00",
      duration: 2,
      lessonStatus: "notStart",
      representativeName: "송준석",
      isDesignated: 1,
      studentCount: 4,
      studentInfo: [
          { studentInfoId: 3, name: "학생3", height: "170cm", weight: "60kg", footSize: 250, age: "14", gender: "M" },
      ]
  },
  {
      userId: 4,
      isFinished: false,
      messageAvailable: true,
      lessonId: 4,
      teamId: 1,
      teamName: "팀D",
      resortName: "리조트4",
      lessonDate: "2024-07-04",
      startTime: "13:00",
      duration: 2,
      lessonStatus: "notStart",
      representativeName: "임종율",
      isDesignated: 1,
      studentCount: 3,
      studentInfo: [
          { studentInfoId: 4, name: "학생4", height: "180cm", weight: "70kg", footSize: 260, age: "16", gender: "F" },
      ]
  },
  {
      userId: 5,
      isFinished: false,
      messageAvailable: true,
      lessonId: 5,
      teamId: 1,
      teamName: "팀E",
      resortName: "리조트5",
      lessonDate: "2024-07-05",
      startTime: "14:00",
      duration: 2,
      lessonStatus: "notStart",
      representativeName: "윤종수",
      isDesignated: 1,
      studentCount: 2,
      studentInfo: [
          { studentInfoId: 5, name: "학생5", height: "190cm", weight: "80kg", footSize: 270, age: "18", gender: "M" },
      ]
  },

  // onGoing
  {
      userId: 6,
      isFinished: false,
      messageAvailable: true,
      lessonId: 6,
      teamId: 2,
      teamName: "팀F",
      resortName: "리조트6",
      lessonDate: "2024-07-06",
      startTime: "10:00",
      duration: 2,
      lessonStatus: "onGoing",
      representativeName: "고승민",
      isDesignated: 1,
      studentCount: 3,
      studentInfo: [
          { studentInfoId: 6, name: "학생6", height: "150cm", weight: "45kg", footSize: 230, age: "10", gender: "M" },
      ]
  },
  {
      userId: 7,
      isFinished: false,
      messageAvailable: true,
      lessonId: 7,
      teamId: 2,
      teamName: "팀G",
      resortName: "리조트7",
      lessonDate: "2024-07-07",
      startTime: "11:00",
      duration: 2,
      lessonStatus: "onGoing",
      representativeName: "김태훈",
      isDesignated: 1,
      studentCount: 2,
      studentInfo: [
          { studentInfoId: 7, name: "학생7", height: "160cm", weight: "50kg", footSize: 240, age: "12", gender: "F" },
      ]
  },
  {
      userId: 8,
      isFinished: false,
      messageAvailable: true,
      lessonId: 8,
      teamId: 2,
      teamName: "팀H",
      resortName: "리조트8",
      lessonDate: "2024-07-08",
      startTime: "12:00",
      duration: 2,
      lessonStatus: "onGoing",
      representativeName: "송준석",
      isDesignated: 1,
      studentCount: 4,
      studentInfo: [
          { studentInfoId: 8, name: "학생8", height: "170cm", weight: "60kg", footSize: 250, age: "14", gender: "M" },
      ]
  },
  {
      userId: 9,
      isFinished: false,
      messageAvailable: true,
      lessonId: 9,
      teamId: 2,
      teamName: "팀I",
      resortName: "리조트9",
      lessonDate: "2024-07-09",
      startTime: "13:00",
      duration: 2,
      lessonStatus: "onGoing",
      representativeName: "임종율",
      isDesignated: 1,
      studentCount: 3,
      studentInfo: [
          { studentInfoId: 9, name: "학생9", height: "180cm", weight: "70kg", footSize: 260, age: "16", gender: "F" },
      ]
  },
  {
      userId: 10,
      isFinished: false,
      messageAvailable: true,
      lessonId: 10,
      teamId: 2,
      teamName: "팀J",
      resortName: "리조트10",
      lessonDate: "2024-07-10",
      startTime: "14:00",
      duration: 2,
      lessonStatus: "onGoing",
      representativeName: "윤종수",
      isDesignated: 1,
      studentCount: 2,
      studentInfo: [
          { studentInfoId: 10, name: "학생10", height: "190cm", weight: "80kg", footSize: 270, age: "18", gender: "M" },
      ]
  },

  // lessonFinished
  {
      userId: 11,
      isFinished: true,
      messageAvailable: true,
      lessonId: 11,
      teamId: 3,
      teamName: "팀K",
      resortName: "리조트11",
      lessonDate: "2024-07-11",
      startTime: "10:00",
      duration: 2,
      lessonStatus: "lessonFinished",
      representativeName: "고승민",
      isDesignated: 1,
      studentCount: 3,
      studentInfo: [
          { studentInfoId: 11, name: "학생11", height: "150cm", weight: "45kg", footSize: 230, age: "10", gender: "M" },
      ]
  },
  {
      userId: 12,
      isFinished: true,
      messageAvailable: true,
      lessonId: 12,
      teamId: 3,
      teamName: "팀L",
      resortName: "리조트12",
      lessonDate: "2024-07-12",
      startTime: "11:00",
      duration: 2,
      lessonStatus: "lessonFinished",
      representativeName: "김태훈",
      isDesignated: 1,
      studentCount: 2,
      studentInfo: [
          { studentInfoId: 12, name: "학생12", height: "160cm", weight: "50kg", footSize: 240, age: "12", gender: "F" },
      ]
  },
  {
      userId: 13,
      isFinished: true,
      messageAvailable: true,
      lessonId: 13,
      teamId: 3,
      teamName: "팀M",
      resortName: "리조트13",
      lessonDate: "2024-07-13",
      startTime: "12:00",
      duration: 2,
      lessonStatus: "lessonFinished",
      representativeName: "송준석",
      isDesignated: 1,
      studentCount: 4,
      studentInfo: [
          { studentInfoId: 13, name: "학생13", height: "170cm", weight: "60kg", footSize: 250, age: "14", gender: "M" },
      ]
  },
  {
      userId: 14,
      isFinished: true,
      messageAvailable: true,
      lessonId: 14,
      teamId: 3,
      teamName: "팀N",
      resortName: "리조트14",
      lessonDate: "2024-07-14",
      startTime: "13:00",
      duration: 2,
      lessonStatus: "lessonFinished",
      representativeName: "임종율",
      isDesignated: 1,
      studentCount: 3,
      studentInfo: [
          { studentInfoId: 14, name: "학생14", height: "180cm", weight: "70kg", footSize: 260, age: "16", gender: "F" },
      ]
  },
  {
      userId: 15,
      isFinished: true,
      messageAvailable: true,
      lessonId: 15,
      teamId: 3,
      teamName: "팀O",
      resortName: "리조트15",
      lessonDate: "2024-07-15",
      startTime: "14:00",
      duration: 2,
      lessonStatus: "lessonFinished",
      representativeName: "윤종수",
      isDesignated: 1,
      studentCount: 2,
      studentInfo: [
          { studentInfoId: 15, name: "학생15", height: "190cm", weight: "80kg", footSize: 270, age: "18", gender: "M" },
      ]
  },

  // yesFeedback
  {
      userId: 16,
      isFinished: true,
      messageAvailable: true,
      lessonId: 16,
      teamId: 4,
      teamName: "팀P",
      resortName: "리조트16",
      lessonDate: "2024-07-16",
      startTime: "10:00",
      duration: 2,
      lessonStatus: "yesFeedback",
      representativeName: "고승민",
      isDesignated: 1,
      studentCount: 3,
      studentInfo: [
          { studentInfoId: 16, name: "학생16", height: "150cm", weight: "45kg", footSize: 230, age: "10", gender: "M" },
      ]
  },
  {
      userId: 17,
      isFinished: true,
      messageAvailable: true,
      lessonId: 17,
      teamId: 4,
      teamName: "팀Q",
      resortName: "리조트17",
      lessonDate: "2024-07-17",
      startTime: "11:00",
      duration: 2,
      lessonStatus: "yesFeedback",
      representativeName: "김태훈",
      isDesignated: 1,
      studentCount: 2,
      studentInfo: [
          { studentInfoId: 17, name: "학생17", height: "160cm", weight: "50kg", footSize: 240, age: "12", gender: "F" },
      ]
  },
  {
      userId: 18,
      isFinished: true,
      messageAvailable: true,
      lessonId: 18,
      teamId: 4,
      teamName: "팀R",
      resortName: "리조트18",
      lessonDate: "2024-07-18",
      startTime: "12:00",
      duration: 2,
      lessonStatus: "yesFeedback",
      representativeName: "송준석",
      isDesignated: 1,
      studentCount: 4,
      studentInfo: [
          { studentInfoId: 18, name: "학생18", height: "170cm", weight: "60kg", footSize: 250, age: "14", gender: "M" },
      ]
  },
  {
      userId: 19,
      isFinished: true,
      messageAvailable: true,
      lessonId: 19,
      teamId: 4,
      teamName: "팀S",
      resortName: "리조트19",
      lessonDate: "2024-07-19",
      startTime: "13:00",
      duration: 2,
      lessonStatus: "yesFeedback",
      representativeName: "임종율",
      isDesignated: 1,
      studentCount: 3,
      studentInfo: [
          { studentInfoId: 19, name: "학생19", height: "180cm", weight: "70kg", footSize: 260, age: "16", gender: "F" },
      ]
  },
  {
      userId: 20,
      isFinished: true,
      messageAvailable: true,
      lessonId: 20,
      teamId: 4,
      teamName: "팀T",
      resortName: "리조트20",
      lessonDate: "2024-07-20",
      startTime: "14:00",
      duration: 2,
      lessonStatus: "yesFeedback",
      representativeName: "윤종수",
      isDesignated: 1,
      studentCount: 2,
      studentInfo: [
          { studentInfoId: 20, name: "학생20", height: "190cm", weight: "80kg", footSize: 270, age: "18", gender: "M" },
      ]
  },

  // cancelLesson
  {
      userId: 21,
      isFinished: true,
      messageAvailable: true,
      lessonId: 21,
      teamId: 5,
      teamName: "팀U",
      resortName: "리조트21",
      lessonDate: "2024-07-21",
      startTime: "10:00",
      duration: 2,
      lessonStatus: "cancelLesson",
      representativeName: "고승민",
      isDesignated: 1,
      studentCount: 3,
      studentInfo: [
          { studentInfoId: 21, name: "학생21", height: "150cm", weight: "45kg", footSize: 230, age: "10", gender: "M" },
      ]
  },
  {
      userId: 22,
      isFinished: true,
      messageAvailable: true,
      lessonId: 22,
      teamId: 5,
      teamName: "팀V",
      resortName: "리조트22",
      lessonDate: "2024-07-22",
      startTime: "11:00",
      duration: 2,
      lessonStatus: "cancelLesson",
      representativeName: "김태훈",
      isDesignated: 1,
      studentCount: 2,
      studentInfo: [
          { studentInfoId: 22, name: "학생22", height: "160cm", weight: "50kg", footSize: 240, age: "12", gender: "F" },
      ]
  },
  {
      userId: 23,
      isFinished: true,
      messageAvailable: true,
      lessonId: 23,
      teamId: 5,
      teamName: "팀W",
      resortName: "리조트23",
      lessonDate: "2024-07-23",
      startTime: "12:00",
      duration: 2,
      lessonStatus: "cancelLesson",
      representativeName: "송준석",
      isDesignated: 1,
      studentCount: 4,
      studentInfo: [
          { studentInfoId: 23, name: "학생23", height: "170cm", weight: "60kg", footSize: 250, age: "14", gender: "M" },
      ]
  },
  {
      userId: 24,
      isFinished: true,
      messageAvailable: true,
      lessonId: 24,
      teamId: 5,
      teamName: "팀X",
      resortName: "리조트24",
      lessonDate: "2024-07-24",
      startTime: "13:00",
      duration: 2,
      lessonStatus: "cancelLesson",
      representativeName: "임종율",
      isDesignated: 1,
      studentCount: 3,
      studentInfo: [
          { studentInfoId: 24, name: "학생24", height: "180cm", weight: "70kg", footSize: 260, age: "16", gender: "F" },
      ]
  },
  {
      userId: 25,
      isFinished: true,
      messageAvailable: true,
      lessonId: 25,
      teamId: 5,
      teamName: "팀Y",
      resortName: "리조트25",
      lessonDate: "2024-07-25",
      startTime: "14:00",
      duration: 2,
      lessonStatus: "cancelLesson",
      representativeName: "윤종수",
      isDesignated: 1,
      studentCount: 2,
      studentInfo: [
          { studentInfoId: 25, name: "학생25", height: "190cm", weight: "80kg", footSize: 270, age: "18", gender: "M" },
      ]
  },
];
