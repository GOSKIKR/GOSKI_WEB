import apiClient from "../utils/config/axiosConfig";
import { httpStatusCode } from "../utils/config/httpStatus";

const url = "/lesson/feedback";

export class FeedbackService {
  async createFeedback(formData: FormData): Promise<void> {
    try {
      const accessToken = sessionStorage.getItem("accesstoken");
      const response = await apiClient(true).post(`${url}/create`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response && response.status === httpStatusCode.CREATE) {
        alert("피드백이 등록되었습니다");
      }
    } catch (error) {
      alert("피드백 등록이 실패하였습니다.");
      console.error(error);
    }
  }

  async updateFeedback(
    feedbackId: number | undefined,
    formData: FormData
  ): Promise<void> {
    try {
      const accessToken = sessionStorage.getItem("accesstoken");
      const response = await apiClient(true).patch(
        `${url}/update/${feedbackId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response && response.status === httpStatusCode.OK) {
        alert("피드백이 수정되었습니다");
      }
    } catch (error) {
      alert("피드백 수정이 실패하였습니다.");
      console.error(error);
    }
  }
}
