import apiClient from "../utils/config/axiosConfig";
import { httpStatusCode } from "../utils/config/httpStatus";
import { PayCancelDTO } from "../dto/PaymentDTO";

export class PayCancelService {
    async cancelLesson(payCancelDTO: PayCancelDTO): Promise<any> {
        try {
            const accessToken = localStorage.getItem("accesstoken");
            const response = await apiClient().post(
                "/payment/reserve/cancel",
                payCancelDTO,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            if (response && response.status === httpStatusCode.OK) {
                return response.data;
            }
        } catch (error) {
            console.error("Failed to cancel reservation:", error);
            throw error;
        }
    }
}
