import { UserPaylistDTO, VerifyAccountDTO } from "../dto/PaymentDTO";
import apiClient from "../utils/config/axiosConfig";
import { httpStatusCode } from "../utils/config/httpStatus";

export class PaymentService {
  async getPaymentList(): Promise<UserPaylistDTO[] | null> {
    try {
      const accessToken = sessionStorage.getItem("accesstoken");
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

  async getSettlementAmount(): Promise<number> {
    try {
      const accessToken = sessionStorage.getItem("accesstoken");
      const response = await apiClient().get(`payment/balance`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response && response.status === httpStatusCode.OK) {
        return response.data.data.balance;
      }
    } catch (error) {
      console.error(error);
    }
    return 0;
  }

  async verifyAcoount(request: VerifyAccountDTO): Promise<boolean> {
    try {
      const accessToken = sessionStorage.getItem("accesstoken");
      const response = await apiClient().post(
        `payment/validate_account`,
        request,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response && response.status === httpStatusCode.OK) {
        console.log(response.data.data);
        return response.data.data.isValid;
      }
    } catch (error) {
      alert("유저 결제 리스트 데이터 조회");
    }
    return false;
  }
}
