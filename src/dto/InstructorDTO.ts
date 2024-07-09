interface certificates {
    certificateId : number,
    certificateImageUrl : string
}

export interface InstructorProfileDTO {
    profileUrl: string,
    userName:string,
    gender : string,
    birthDate : string,
    role : string,
    phoneNumber : string,
    description : string,
    dayoff : number,
    permission : string,				
    certificates : certificates[]
}