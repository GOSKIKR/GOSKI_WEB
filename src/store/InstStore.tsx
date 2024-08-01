import { create, StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import { CertificateUrlVO, InstructorProfileDTO } from "../dto/InstructorDTO";
import { UserMyDTO } from "../dto/UserMyDTO";

interface InstructorState {
    userName: string;
    gender: string;
    profileUrl: string;
    role: string;
    phoneNumber: string;
    description: string;
    birthDate: string;
    dayoff: number;
    permission: number;
    certificates: { certificateId: number, certificateImageUrl: string }[];
    setProfile: (profile: UserMyDTO | InstructorProfileDTO) => void;
    setDescription: (newDesc: string) => void;
    setCertificates: (certificates: { certificateId: number, certificateImageUrl: string }[]) => void;
}

type InstructorPersist = (
    config: StateCreator<InstructorState>,
    options: PersistOptions<InstructorState>
) => StateCreator<InstructorState>;

const useInstructorStore = create<InstructorState>(
    (persist as InstructorPersist)(
        (set) => ({
            userName: '',
            gender: '',
            profileUrl: '',
            role: '',
            phoneNumber: '',
            description: '',
            birthDate: '',
            dayoff: 0,
            permission: 0,
            certificates: [],
            setProfile: (profile: UserMyDTO | InstructorProfileDTO) => set(() => ({
                userName: profile.userName,
                gender: profile.gender,
                profileUrl: profile.profileUrl,
                role: profile.role,
                phoneNumber: profile.phoneNumber,
                description: 'description' in profile ? profile.description : '',
                birthDate: profile.birthDate,
                dayoff: 'dayoff' in profile ? profile.dayoff : 0,
                permission: 'permission' in profile ? profile.permission : 0,
                certificates: 'certificates' in profile ? profile.certificates : []
            })),
            setDescription: (newDesc: string) => set(() => ({ description: newDesc })),
            setCertificates: (certificates: CertificateUrlVO[]) => set(() => ({ certificates })),
        }),
        {
            name: "instructor-store", // 이름을 지정하여 localStorage에 저장
            getStorage: () => localStorage, // localStorage 사용
        }
    )
);

export default useInstructorStore;
