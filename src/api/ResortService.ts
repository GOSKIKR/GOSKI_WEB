import apiClient from "../utils/config/axiosConfig";
import { ResortDTO } from "../dto/ResortDTO";

export class ResortService {
    async getResortInformation(): Promise<ResortDTO[] | null> {
        try {
            const accessToken = localStorage.getItem("accesstoken");
            const response = await apiClient().get("/common/resort", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const resorts: ResortDTO[] = response.data.data.map(
                (resort: any) => ({
                    resortId: resort.resortId,
                    resortName: resort.resortName,
                    resortLocation: resort.resortLocation,
                    latitude: resort.latitude,
                    longitude: resort.longitude,
                    lessonTime: resort.lessonTime,
                })
            );
            return resorts;
        } catch (error) {
            console.error("Failed to fetch resorts:", error);
            return null;
        }
    }
}
