import apiClient from "../utils/config/axiosConfig";
import { InstructorLessonInfoDTO } from "../dto/InstructorLessonInfoDTO";
import { httpStatusCode } from "../utils/config/httpStatus";

const url = "/lesson"

export class LessonService {

    async getInstructorLessonList(): Promise<InstructorLessonInfoDTO[] | null> {
        try {
            const accessToken = localStorage.getItem("accesstoken");
            const response = await apiClient().get(`${url}/list/instructor`,{
                headers: {
                    Authorization: `Bearer ${accessToken}`,
            }});
            if (response && response.status === httpStatusCode.OK) {
                return response.data.data as InstructorLessonInfoDTO[];
            }
        } catch (error) {
            alert("강사 강습 내역 리스트 조회 실패");
        }
        return null;
    }
}
