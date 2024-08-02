import { CreateEvent } from "../dto/EventDTO";
import apiClient from "../utils/config/axiosConfig";

export class CreateEventService {
  async createEvent(eventDTO: CreateEvent): Promise<any> {
    try {
      const accessToken = sessionStorage.getItem("accesstoken");
      const response = await apiClient().post(`/schedule/create`, eventDTO, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(eventDTO);
      return response.data;
    } catch (error) {
      console.log(eventDTO);
      console.log("일정 등록 실패");
    }
  }
}
