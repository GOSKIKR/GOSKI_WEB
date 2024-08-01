import { Event } from "./../dto/EventDTO";
import apiClient from "../utils/config/axiosConfig";
import { httpStatusCode } from "../utils/config/httpStatus";

export class TeamEventService {
  async getTeamEventService(
    teamId: number,
    weekOffset: number
  ): Promise<Event[]> {
    try {
      const accessToken = sessionStorage.getItem("accesstoken");
      const response = await apiClient().get(
        `/schedule/week/${teamId}/${weekOffset}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response && response.status === httpStatusCode.OK) {
        return response.data.data as Event[];
      }
    } catch (error) {
      console.log("팀 이벤트 조회 실패");
    }
    return [];
  }
}
