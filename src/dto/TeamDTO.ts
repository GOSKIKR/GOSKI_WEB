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
    name: string;
    phoneNumber: string;
    enrollDate: string;
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
}

export interface CertificateInfoVO {
    certificateId : number;
    certificateName : number;
    certificateType : number;
    certificateImageUrl : number;
}

export interface TeamInstInfoDTO {
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