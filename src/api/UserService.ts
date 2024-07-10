import { InstructorProfileDTO } from "../dto/InstructorDTO";
import apiClient from "../utils/config/axiosConfig";
import { httpStatusCode } from "../utils/config/httpStatus";

const url: string = "/user";
const accessToken = localStorage.getItem("accesstoken");

export class UserService {
    async getInstructorProfile(): Promise<InstructorProfileDTO | null> {
        try {
            const response = await apiClient().get(`${url}/profile/inst`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log(response.data.data);
            if (response && response.status === httpStatusCode.OK) {
                return response.data.data as InstructorProfileDTO;
            }
        } catch (error) {
            alert("강사 프로필 조회 실패");
        }
        return null;
    }

    async updateInstructorProfile(description: string, profileImage : File | null): Promise<void> {
        const formData = new FormData();
        formData.append("description",description)
        if (profileImage){
            formData.append("profileImage",profileImage)
        }
        try {
            const response = await apiClient(true).patch(`${url}/update/inst`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response && response.status === httpStatusCode.OK) {
                console.log("프로필 업데이트 성공");
            }
        } catch (error) {
            console.error("프로필 업데이트 실패", error);
        }
    }
}
