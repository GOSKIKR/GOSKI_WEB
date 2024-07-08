import apiClient from "../utils/config/axiosConfig";
import { InstructorLessonInfoDTO } from "../dto/InstructorLessonInfoDTO";
import { httpStatusCode } from "../utils/config/httpStatus";

const url = "/lesson"

export class LessonService {

    async getInstructorLessonList() : Promise<InstructorLessonInfoDTO | null>{
        try {
            const response = await apiClient().get(`${url}/instructor`);
            if (response && response.status == httpStatusCode.OK) {
                return response.data as InstructorLessonInfoDTO
            }
        } catch (error){
            alert("강사 강습 내역 리스트 조회 실패")
        }
        return null;
    }

}