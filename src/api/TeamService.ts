import { Team, TeamInfoDTO, TeamInstDesignatedFeeDTO } from "../dto/TeamDTO";
import apiClient from "../utils/config/axiosConfig";
import { httpStatusCode } from "../utils/config/httpStatus";

const url = "/team"

const accessToken = localStorage.getItem("accesstoken");

export class TeamService {
    async getTeamList(): Promise<Team[] | null> {
        try {
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

    async getTeamInfo(teamId : number) : Promise<TeamInfoDTO | null> {
        try{
            const response = await apiClient().get(`${url}/${teamId}`,{
                headers : {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            if (response && response.status === httpStatusCode.OK) {
                console.log(response.data.data)
                return response.data.data as TeamInfoDTO;
            }
        } catch (error) {
            console.log("팀 정보 조회 실패");
        }
        return null;
    }

    async getDesignatedFeeList(teamId : number) : Promise<TeamInstDesignatedFeeDTO | null> {
        try{
            const response = await apiClient().get(`${url}/list/designfee/${teamId}`,{
                headers : {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            if (response && response.status === httpStatusCode.OK) {
                console.log(response.data.data)
                return response.data.data as TeamInstDesignatedFeeDTO;
            }
        } catch (error) {
            console.log("지정 강습비 조회 실패");
        }
        return null;
    }

}
