import axiosInstance from "./axiosInstance"
import { showMessage } from "react-native-flash-message";

import { IApiResponse } from "../interfaces/IApiResponse";
import { Game, GamePlatform, NewGameRequest } from "interfaces/IGames";

export function GamesService() {
  const root = '/games'

  async function getByGamerProfileAndIdRawgGame(idGamerProfile: number, idRawgGame: number) {
    try {
      const response = await axiosInstance.get<IApiResponse<Game>>(`${root}/gamer-profile/${idGamerProfile}?idRawgGame=${idRawgGame}`);

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

  async function newGame(request: NewGameRequest, idGamerProfile: number) {
    try {
      const response = await axiosInstance.post<IApiResponse<Game>>(`${root}/new?idGamerProfile=${idGamerProfile}`, request);

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


  async function updatePlatforms(id: number, platforms: GamePlatform[]) {
    try {
      const response = await axiosInstance.put<IApiResponse<string>>(`${root}/${id}`, platforms);
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

  async function deleteGame(id: number) {
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
    getByGamerProfileAndIdRawgGame,
    newGame,
    updatePlatforms,
    deleteGame,
  }
}