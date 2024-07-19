// import { create,StateCreator} from "zustand";
// import { persist, PersistOptions } from "zustand/middleware";
// import { CertificateUrlVO, InstructorProfileDTO } from "../dto/InstructorDTO";

// interface TeamInstState {
//     userName: string;
//     gender: string;
//     profileUrl: string;
//     role: string;
//     phoneNumber: string;
//     description: string;
//     birthDate: string;
//     dayoff: number;
//     permission: string;
//     certificates: { certificateId: number, certificateImageUrl: string }[];
//     setProfile: (profile: InstructorProfileDTO) => void;
//     setDescription: (newDesc: string) => void;
//     setCertificates: (certificates: { certificateId: number, certificateImageUrl: string }[]) => void;
// }

// type TeamInstPersist = (
//     config: StateCreator<InstructorState>,
//     options: PersistOptions<InstructorState>
// ) => StateCreator<InstructorState>;

// const useTeamInstStore = create<InstructorState>(
//     (persist as InstructorPersist)(
//         (set) => ({
//             userName: '',
//             gender: '',
//             profileUrl: '',
//             role: '',
//             phoneNumber: '',
//             description: '',
//             birthDate: '',
//             dayoff: 0,
//             permission: '',
//             certificates: [],
//             setProfile: (profile: InstructorProfileDTO) => set(() => ({
//                 userName: profile.userName,
//                 gender: profile.gender,
//                 profileUrl: profile.profileUrl,
//                 role: profile.role,
//                 phoneNumber: profile.phoneNumber,
//                 description: profile.description,
//                 birthDate: profile.birthDate,
//                 dayoff: profile.dayoff,
//                 permission: profile.permission,
//                 certificates: profile.certificates.map(cert => ({
//                     certificateId: cert.certificateId,
//                     certificateImageUrl: cert.certificateImageUrl,
//                 }))
//             })),
//             setDescription: (newDesc:string) => set(() => ({ description: newDesc })),
//             setCertificates: (certificates : CertificateUrlVO[]) => set(() => ({ certificates })),
//         }),
//         {
//             name: "team-inst-store", // 이름을 지정하여 localStorage에 저장
//             getStorage: () => localStorage, // localStorage 사용
//         }
//     )
// );

// export default useTeamInstStore;
