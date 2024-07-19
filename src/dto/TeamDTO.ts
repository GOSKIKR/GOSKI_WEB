export interface Team {
    teamId: number;
    teamName: string;
    profileUrl: string;
    description: string;
    resortName: string;
    permissions?: string;
}

export interface Member {
    userId: number;
    userName: string;
    phoneNumber: string;
    profileUrl: string;
    position: number;
}

export interface TeamMemberList {
    permission: string;
    instList: Member[];
}

export interface TeamInviteDTO {
    userId : number;
    name: string;
    phoneNumber: string;
    enrollmentDate: string;
    profileUrl : string;
}

export interface TeamMemberDTO {
    role: string;
    name: string;
    price: string;
    phoneNumber: string;
}

export interface TeamImageVO {
    teamImageId : number;
    imageUrl : string;
}

export interface TeamInfoDTO {
    teamId : number;
    teamName : string;
    resortId : number;
    teamProfileImageUrl : string;
    description : string;
    teamCost : number;
    dayoff : number;
    dayoffList : number[];
    teamImages : TeamImageVO[];
    intermediateFee : number;
    advancedFee : number;
    oneTwoFee : number;
    oneThreeFee : number;
    oneFourFee : number;
    oneNFee : number;
    designatedFees: Map<number, number>;
}

export interface TeamLessonFeeRequestDTO {
    teamCost: number;
    intermediateFee: number;
    advancedFee: number;
    oneTwoFee: number;
    oneThreeFee: number;
    oneFourFee: number;
    oneNFee: number;
    designatedFees: { [key: number]: number };
}


export interface CertificateInfoVO {
    certificateId : number;
    certificateName : number;
    certificateType : number;
    certificateImageUrl : number;
}

export interface TeamInstInfoDTO {
    teamId : number;
    userId : number;
    userName : string;
    phoneNumber : string;
    profileUrl : string;
    invitePermission : boolean;
    addPermission : boolean;
    modifyPermission : boolean;
    deletePermission : boolean;
    costPermission : boolean;
    position : number;
    designatedFee : number;
    certificateInfoList : CertificateInfoVO[];
}

export interface TeamInstUpdateRequestDTO {
    teamId : number;
    instructorId : number;
    invitePermission : boolean;
    addPermission : boolean;
    modifyPermission : boolean;
    deletePermission : boolean;
    costPermission : boolean;
    position : number;
    designatedCost : number;
}

export interface InviteCancelRequestDTO {
    teamId : number;
    receiverId : number;
}