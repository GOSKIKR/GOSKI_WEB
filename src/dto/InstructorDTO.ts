export interface Certificate {
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
    certificates : Certificate[]
}

export interface NewCertificate {
    certificateId : number,
    newCertImage : File
}

