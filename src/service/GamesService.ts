import { IApiResponse } from "../interfaces/IApiResponse";
import { IRawgGamesResponse, IRawgPlatformsResponse } from "../interfaces/IGames";
import axiosInstance from "./axiosInstance"

export function GamesService() {
  const root = '/games'

  async function searchRawgPlatforms(page:number, pageSize:number) {
    try {
      const response = await axiosInstance.get<IApiResponse<IRawgPlatformsResponse>>(`${root}/rawg/platforms`, {
        params: { page,  pageSize }
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

  async function searchRawgGames(page:number, pageSize:number, platforms:number[], search:string) {
    const request = {page,  pageSize, platforms, search}
    try {
      const response = await axiosInstance.post<IApiResponse<IRawgGamesResponse>>(`${root}/rawg/search`, request);

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
    searchRawgPlatforms,
    searchRawgGames,
  }
}