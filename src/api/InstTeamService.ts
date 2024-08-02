import { Team } from "../dto/TeamDTO";
import apiClient from "../utils/config/axiosConfig";
import { httpStatusCode } from "../utils/config/httpStatus";

export class InstructorTeamService {
  async getTeamList(): Promise<Team[]> {
    try {
      const accessToken = sessionStorage.getItem("accesstoken");
      const response = await apiClient().get(`/team/list/inst`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response && response.status === httpStatusCode.OK) {
        return response.data.data as Team[];
      }
    } catch (error) {
      console.log("팀 리스트 조회 실패");
    }
    return [];
  }
}
