import { IApiResponse } from "../interfaces/IApiResponse";
import { IMatch } from "../interfaces/IMatch";
import axiosInstance from "./axiosInstance";

export function MatchService() {
  const root = '/match';

  async function saveMatch(match:IMatch) {
    try {
      const response = await axiosInstance.post<IApiResponse<any>>(`${root}`, match);
      return response.data;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }

  return {
    saveMatch,
  }
}