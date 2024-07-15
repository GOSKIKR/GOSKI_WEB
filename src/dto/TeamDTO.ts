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