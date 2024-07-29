import { Team, TeamInfoDTO, TeamLessonFeeRequestDTO, TeamInstInfoDTO, AllInstDTO,
    TeamInstUpdateRequestDTO, TeamInviteDTO, InviteCancelRequestDTO, 
    InviteRequestDTO} from "../dto/TeamDTO";
import apiClient from "../utils/config/axiosConfig";
import { httpStatusCode } from "../utils/config/httpStatus";

const url = "/team"

const accessToken = localStorage.getItem("accesstoken");

export class TeamService {
    async getAllInstList(teamId : number): Promise<AllInstDTO[] | null> {
        try {
            const response = await apiClient().get(`${url}/inst/all/${teamId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (response && response.status === httpStatusCode.OK) {
                console.log(response.data.data)
                return response.data.data as AllInstDTO[];
            }
        } catch (error) {
            console.log("모든 강사 리스트 조회 실패");
        }
        return null;
    }

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

    async getTeamInstInfoList(teamId : number) : Promise<TeamInstInfoDTO[] | null> {
        try{
            const response = await apiClient().get(`${url}/list/team-inst/${teamId}`,{
                headers : {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            if (response && response.status === httpStatusCode.OK) {
                console.log(response.data.data)
                return response.data.data as TeamInstInfoDTO[];
            }
        } catch (error) {
            console.log("팀 강사 정보 조회 실패");
        }
        return null;
    }

    async getPendingApprovalList(teamId : number) : Promise<TeamInviteDTO[] | null> {
        try{
            const response = await apiClient().get(`${url}/pending-approval/${teamId}`,{
                headers : {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            if (response && response.status === httpStatusCode.OK) {
                console.log(response.data.data)
                return response.data.data as TeamInviteDTO[];
            }
        } catch (error) {
            console.log("팀 초대 수락 대기 리스트 실패");
        }
        return null;
    }

    async updateTeamLessonFee(teamId : number, data : TeamLessonFeeRequestDTO): Promise<void> {
        try {
            const accessToken = localStorage.getItem("accesstoken");
            const response = await apiClient().patch(
                `${url}/update/${teamId}`, 
                data,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (response && response.status === httpStatusCode.OK) {
                alert("팀 강습비 정보가 수정되었습니다")
            }
        } catch (error) {
            alert("팀 강습비 정보 수정에 실패하였습니다.")
            console.error(error)
        }
    }

    async updateTeamInstructorInfo(data : TeamInstUpdateRequestDTO): Promise<void> {
        try {
            const accessToken = localStorage.getItem("accesstoken");
            const response = await apiClient().patch(
                `${url}/update/member`, 
                data,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (response && response.status === httpStatusCode.OK) {
                alert("강사 정보가 수정되었습니다")
            }
        } catch (error) {
            alert("강사 정보 수정에 실패하였습니다.")
            console.error(error)
        }
    }

    async updateAllTeamInstructorInfo(data : TeamInstUpdateRequestDTO[]): Promise<void> {
        try {
            const accessToken = localStorage.getItem("accesstoken");
            const response = await apiClient().patch(
                `${url}/update/member/all`, 
                data,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (response && response.status === httpStatusCode.OK) {
                alert("강사 정보가 일괄 수정되었습니다")
            }
        } catch (error) {
            alert("강사 정보 일괄 수정에 실패하였습니다.")
            console.error(error)
        }
    }

    async InviteInstructor(data : InviteRequestDTO): Promise<void> {
        try {
            const accessToken = localStorage.getItem("accesstoken");
            const response = await apiClient().post(
                "/notification/invite",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            if (response && response.status === httpStatusCode.OK) {
                alert("초대 요청이 전송되었습니다.")
                console.log(response);
            }
        } catch (error) {
            console.error("초대 요청 취소에 실패하였습니다.");
            // throw error;
        }
    }


    async cancelTeamInvite(data : InviteCancelRequestDTO): Promise<void> {
        try {
            const accessToken = localStorage.getItem("accesstoken");
            const response = await apiClient().post(
                "/notification/cancel",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            if (response && response.status === httpStatusCode.OK) {
                alert("초대 요청이 취소되었습니다.")
                console.log(response);
            }
        } catch (error) {
            console.error("초대 요청 취소에 실패하였습니다.");
            // throw error;
        }
    }




}
