import { IApiResponse } from "../interfaces/IApiResponse";
import axiosInstance from "./axiosInstance";

export function GamerProfileService() {
  const root = '/gamer-profile';

  async function addGameToProfile(id:number, request:any) {
    try {
      const response = await axiosInstance.post<IApiResponse<any>>(`${root}/${id}/add-game`, request);

      if (response.data.statusCode == 200 && response.data.result) {
        return response.data.result;
      } else {
        console.log("error", response.data.statusCode);
        throw response.data.errorMessage;
      }
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }

  return {
    addGameToProfile,
  }
}