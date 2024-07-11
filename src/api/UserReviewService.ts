import { UserReviewDTO } from "../dto/UserReviewDTO";
import apiClient from "../utils/config/axiosConfig";
import { httpStatusCode } from "../utils/config/httpStatus";

export class UserReviewService {
    async writeUserReview(reviewDTO: UserReviewDTO): Promise<any> {
        try {
            const accessToken = localStorage.getItem("accesstoken");
            const response = await apiClient().post(
                `/lesson/review/create`,
                reviewDTO,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            return response.data;
        } catch (error) {
            console.log("리뷰 작성 실패");
        }
    }
}
