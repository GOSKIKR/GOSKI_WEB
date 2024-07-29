import { UserMyDTO } from "../dto/UserMyDTO";
import apiClient from "../utils/config/axiosConfig";
import { httpStatusCode } from "../utils/config/httpStatus";

const url: string = "/user";
const accessToken = localStorage.getItem("accesstoken");

export class UserMyService {
    async getUserProfile(): Promise<UserMyDTO | null> {
        try {
            const response = await apiClient().get(`${url}/profile/user`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log(response.data.data);
            if (response && response.status === httpStatusCode.OK) {
                return response.data.data as UserMyDTO;
            }
        } catch (error) {
            alert("유저 프로필 조회 실패");
        }
        return null;
    }
}
