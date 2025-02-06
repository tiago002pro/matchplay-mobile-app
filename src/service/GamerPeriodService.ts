import { IApiResponse } from "../interfaces/IApiResponse";
import { IGamerPeriod } from "../interfaces/IPerson";
import axiosInstance from "./axiosInstance";

export function GamerPeriodService() {
  const root = '/gamer-period';

  async function update(gamerPeriod:IGamerPeriod):Promise<IGamerPeriod> {
    try {
      const response = await axiosInstance.put<IApiResponse<IGamerPeriod>>(`${root}`, gamerPeriod);
      return response.data.result;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }

  return {
    update,
  }
}