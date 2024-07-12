import { Tag } from "../dto/ReviewDTO";
import apiClient from "../utils/config/axiosConfig";
import { httpStatusCode } from "../utils/config/httpStatus";

export class ReviewTagService {
    async getTags(): Promise<Tag[]> {
        try {
            const accessToken = localStorage.getItem("accesstoken");
            const response = await apiClient().get(`/lesson/review/tags`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response && response.status === httpStatusCode.OK) {
                return response.data.data as Tag[];
            }
        } catch (error) {
            console.log("태그 조회 실패");
        }
        return [];
    }
}
