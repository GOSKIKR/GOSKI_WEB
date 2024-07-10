import { UserPaylistDTO } from "../dto/PaymentDTO";
import apiClient from "../utils/config/axiosConfig";
import { httpStatusCode } from "../utils/config/httpStatus";

export class PaymentService {
    async getPaymentList(): Promise<UserPaylistDTO[] | null> {
        try {
            const accessToken = localStorage.getItem("accesstoken");
            const response = await apiClient().get(`payment/history`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response && response.status === httpStatusCode.OK) {
                return response.data.data as UserPaylistDTO[];
            }
        } catch (error) {
            alert("유저 결제 리스트 데이터 조회");
        }
        return null;
    }
}
