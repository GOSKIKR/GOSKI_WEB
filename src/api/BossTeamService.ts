import { Team } from "../dto/TeamDTO";
import apiClient from "../utils/config/axiosConfig";
import { httpStatusCode } from "../utils/config/httpStatus";

export class BossTeamService {
    async getBossTeamList(): Promise<Team[]> {
        try {
            const accessToken = localStorage.getItem("accesstoken");
            const response = await apiClient().get(`/team/list/owner`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (response && response.status === httpStatusCode.OK) {
                return response.data.data as Team[];
            }
        } catch (error) {
            console.log(error);
            console.log("팀 리스트 조회 실패");
        }
        return [];
    }
}
