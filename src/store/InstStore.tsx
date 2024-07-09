import { create } from "zustand";
import { InstructorProfileDTO } from "../dto/InstructorDTO";

interface InstructorState {
    userName: string;
    gender: string;
    profileUrl: string;
    role: string;
    phoneNumber: string;
    description: string;
    birthDate: string;
    dayoff: number;
    permission: string;
    certificates: { certificateId: number, certificateImageUrl: string }[];
    setProfile: (profile: InstructorProfileDTO) => void;
    setDescription: (newDesc: string) => void;
    setCertificates: (certificates: { certificateId: number, certificateImageUrl: string }[]) => void;
}

export const instStore = create<InstructorState>((set) => ({
    userName: '',
    gender: '',
    profileUrl: '',
    role: '',
    phoneNumber: '',
    description: '',
    birthDate: '',
    dayoff: 0,
    permission: '',
    certificates: [],
    setProfile: (profile: InstructorProfileDTO) => set(() => ({
        userName: profile.userName,
        gender: profile.gender,
        profileUrl: profile.profileUrl,
        role: profile.role,
        phoneNumber: profile.phoneNumber,
        description: profile.description,
        birthDate: profile.birthDate,
        dayoff: profile.dayoff,
        permission: profile.permission,
        certificates: profile.certificates.map(cert => ({
            certificateId: cert.certificateId,
            certificateImageUrl: cert.certificateImageUrl,
        }))
    })),
    setDescription: (newDesc) => set(() => ({ description: newDesc })),
    setCertificates: (certificates) => set(() => ({ certificates })),
}));
