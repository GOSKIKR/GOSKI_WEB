import { InstructorReviewDTO, ReviewDTO } from "../dto/ReviewDTO";
import apiClient from "../utils/config/axiosConfig";
import { httpStatusCode } from "../utils/config/httpStatus";

const url = "/lesson/review";

export class ReviewService{
    async getReviews(lessonId : number) : Promise<ReviewDTO | null>{
        try{
            const accessToken = localStorage.getItem("accesstoken")
            const response = await apiClient().get(`${url}/${lessonId}`,{
                headers : {
                    Authorization : `Bearer ${accessToken}`
                }});
            if (response && response.status === httpStatusCode.OK){
                return response.data.data as ReviewDTO
            }
        } catch (error){
            console.error(error)
        }
        return null
    }

  async getInstructorReviews(): Promise<InstructorReviewDTO[] | null> {
    try {
      const accessToken = sessionStorage.getItem("accesstoken");
      const response = await apiClient().get(`${url}/list`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response && response.status === httpStatusCode.OK) {
        return response.data.data as InstructorReviewDTO[];
      }
    } catch (error) {
      console.error(error)
    }
    return null;
  }
}
