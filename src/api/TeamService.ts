import { Team } from "../dto/TeamDTO";
import apiClient from "../utils/config/axiosConfig";
import { httpStatusCode } from "../utils/config/httpStatus";

const url = "/team"

export class TeamService {
    async getTeamList(): Promise<Team[] | null> {
        try {
            const accessToken = localStorage.getItem("accesstoken");
            const response = await apiClient().get(`${url}/list/owner`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (response && response.status === httpStatusCode.OK) {
                console.log(response.data.data)
                return response.data.data as Team[];
            }
        } catch (error) {
            console.log("팀 리스트 조회 실패");
        }
        return null;
    }
}
