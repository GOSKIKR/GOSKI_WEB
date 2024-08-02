import { Event } from "./../dto/EventDTO";
import apiClient from "../utils/config/axiosConfig";
import { httpStatusCode } from "../utils/config/httpStatus";

export class InstEventService {
  async getInstEventService(): Promise<Event[]> {
    try {
      const accessToken = sessionStorage.getItem("accesstoken");
      const response = await apiClient().get(`/schedule/mine`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response && response.status === httpStatusCode.OK) {
        return response.data.data as Event[];
      }
    } catch (error) {
      console.log("이벤트 조회 실패");
    }
    return [];
  }
}
