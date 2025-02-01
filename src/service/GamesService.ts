import { IApiResponse } from "../interfaces/IApiResponse";
import { IRawgGamesResponse } from "../interfaces/IGames";
import axiosInstance from "./axiosInstance"

export function GamesService() {
  const root = '/games'

  async function searchRawgGames(page:number, pageSize:number, search:string) {
    try {
      const response = await axiosInstance.get<IApiResponse<IRawgGamesResponse>>(`${root}/rawg/search`, {
        params: { page,  pageSize, search }
      });

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
    searchRawgGames,
  }
}