export interface UserPaylistDTO {
    lessonId: number;
    userName: string;
    teamName: string;
    paymentDate: string;
    paybackDate: string;
    paymentStatus: number;
    chargeName: string;
    charge: number;
    totalAmount: number;
    basicFee: number;
    designatedFee: number;
    peopleOptionFee: number;
    levelOptionFee: number;
}

export interface PayCancelDTO {
    lessonId: number;
}

export interface VerifyAccountDTO {
    name : string;
    bank : string;
    account : string;
    identity : string;
}
