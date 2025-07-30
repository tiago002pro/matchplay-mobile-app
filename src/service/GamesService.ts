import { showMessage } from "react-native-flash-message";
import { IApiResponse } from "../interfaces/IApiResponse";
import { IGame, IRawgGamesResponse, IRawgPlatformsResponse } from "../interfaces/IGames";
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

  async function getByIdRawgGameAndGamerProfile(gamerProfileId:number, idRawgGame:number) {
    try {
      const response = await axiosInstance.get<IApiResponse<IGame>>(`${root}/gamer-profile/${gamerProfileId}?idRawgGame=${idRawgGame}`);

      if (response.data.statusCode == 200) {
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

  async function getRawgGamesGameById(rawgGameId:number) {
    try {
      const response = await axiosInstance.get<IApiResponse<RawgGames>>(`${root}/rawg/${rawgGameId}`);
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

  async function update(game:IGame) {
    try {
      const response = await axiosInstance.put<IApiResponse<RawgGames>>(`${root}`, game);
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

  async function deleteGame(id:Number) {
    try {
      const response = await axiosInstance.delete<IApiResponse<String>>(`${root}/${id}`);
      if (response.data.statusCode == 200 && response.data.result) {
        return response.data.result;
      } else {
        showMessage({
          message: `Ops, algo deu errado!`,
          description: response.data.errorMessage,
          type: "danger",
          duration: 3000
        })
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
    getByIdRawgGameAndGamerProfile,
    getRawgGamesGameById,
    update,
    deleteGame,
  }
}