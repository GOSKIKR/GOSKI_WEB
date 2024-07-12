import { Member, TeamMemberList } from "../dto/TeamDTO";
import apiClient from "../utils/config/axiosConfig";
import { httpStatusCode } from "../utils/config/httpStatus";

export class TeamMemberListService {
    async getTeamMemberService(teamId: number): Promise<TeamMemberList | null> {
        try {
            const accessToken = localStorage.getItem("accesstoken");
            const response = await apiClient().get(`/team/member/${teamId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (response && response.status === httpStatusCode.OK) {
                return response.data.data as TeamMemberList;
            }
        } catch (error) {
            console.log("팀 멤버 조회 실패");
        }
        return null;
    }
}
