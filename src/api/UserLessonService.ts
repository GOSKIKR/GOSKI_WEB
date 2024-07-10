import { UserLessonDTO } from "../dto/UserLessonDTO";
import apiClient from "../utils/config/axiosConfig";
import { httpStatusCode } from "../utils/config/httpStatus";

export class UserLessonService {
    async getUserLessonlist(): Promise<UserLessonDTO[] | null> {
        try {
            const accessToken = localStorage.getItem("accesstoken");
            const response = await apiClient().get(`lesson/list/user`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response && response.status === httpStatusCode.OK) {
                return response.data.data as UserLessonDTO[];
            }
        } catch (error) {
            alert("유저 레슨 리스트 데이터 조회");
        }
        return null;
    }
}
