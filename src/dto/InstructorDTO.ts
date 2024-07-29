import { UserMyDTO } from "./UserMyDTO";

export interface CertificateUrlVO {
    certificateId : number,
    certificateImageUrl : string
}

export interface InstructorProfileDTO extends UserMyDTO{
    description : string,
    dayoff : number,
    permission : number,				
    certificates : CertificateUrlVO[]
}

export interface NewCertificate {
    certificateId: number;
    newCertImage?: File;
}

export interface InstPermissionDTO {

    userId : number;
    userName : string;
    phoneNumber : string;
    invitePermission : boolean;
    addPermission : boolean;
    modifyPermission : boolean;
    deletePermission : boolean;
    costPermission : boolean;
    position : number;
    designatedFee : number;
}

