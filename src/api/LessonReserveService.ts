import apiClient from "../utils/config/axiosConfig";
import { ReserveDTO } from "../dto/ReserveDTO";

export class LessonReserveService {
    async reserveLesson(reserveDTO: ReserveDTO): Promise<any> {
        try {
            const accessToken = localStorage.getItem("accesstoken");
            const response = await apiClient().post(
                "/lesson/reserve/novice",
                reserveDTO,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error("Failed to reserve lesson:", error);
            throw error;
        }
    }
}
