import { InstructorProfileDTO } from "../dto/InstructorDTO";
import apiClient from "../utils/config/axiosConfig";
import { httpStatusCode } from "../utils/config/httpStatus";

const url : string = "/user"

export class UserService {

    async getInstructorProfile() : Promise<InstructorProfileDTO | null> {
        try {
            const accessToken = localStorage.getItem("accesstoken");
            const response = await apiClient().get(`${url}/profile/inst`,{
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }})
            console.log(response.data.data)
            if(response && response.status === httpStatusCode.OK) {
                return response.data.data as InstructorProfileDTO
            }
        } catch(error) {
            alert("강사 프로필 조회 실패")
        }
        return null;
    }

}