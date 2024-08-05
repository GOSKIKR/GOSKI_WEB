import { CreateEvent } from "../dto/EventDTO";
import apiClient from "../utils/config/axiosConfig";

export class CreateEventService {
    async createEvent(eventDTO: CreateEvent): Promise<any> {
        try {
            const accessToken = sessionStorage.getItem("accesstoken");
            const response = await apiClient().post(
                `/schedule/create`,
                eventDTO,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            console.log(eventDTO);
            return response.data;
        } catch (error: any) {
            console.log(eventDTO);
            console.log("일정 등록 실패");
            if (error.response && error.response.status === 400) {
                alert(
                    "해당 시간대에 동일한 강사의 일정이 이미 등록되어 있습니다."
                );
            }
        }
    }
}
