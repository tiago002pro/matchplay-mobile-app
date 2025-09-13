import axiosInstance from "./axiosInstance"

import { RawgGames, RawgGamesResponse, RawgPlatformsResponse } from "interfaces/RawgGames";
import { IApiResponse } from "../interfaces/IApiResponse";

export function RawgGamesService() {
  const root = '/rawg-games'

  async function searchPlatforms(page: number, pageSize: number) {
    try {
      const response = await axiosInstance.get<IApiResponse<RawgPlatformsResponse>>(`${root}/platforms`, {
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

  async function searchGames(page :number, pageSize :number, platforms :number[], search: string) {
    const request = {page,  pageSize, platforms, search}
    try {
      const response = await axiosInstance.post<IApiResponse<RawgGamesResponse>>(`${root}/search`, request);

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

  async function getGameById(id: number) {
    try {
      const response = await axiosInstance.get<IApiResponse<RawgGames>>(`${root}/${id}`);
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
    searchPlatforms,
    searchGames,
    getGameById,
  }
}