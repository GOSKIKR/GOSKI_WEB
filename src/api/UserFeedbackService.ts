import { FeedbackDataDTO } from "../dto/FeedbackDTO";
import apiClient from "../utils/config/axiosConfig";
import { httpStatusCode } from "../utils/config/httpStatus";

export class UserFeedbackService {
  async getUserFeedback(lessonId: number): Promise<FeedbackDataDTO | null> {
    try {
      const accessToken = sessionStorage.getItem("accesstoken");
      const response = await apiClient().get(`/lesson/feedback/${lessonId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response && response.status === httpStatusCode.OK) {
        return response.data.data as FeedbackDataDTO;
      }
    } catch (error) {
      console.log("피드백 조회 실패");
    }
    return null;
  }
}
