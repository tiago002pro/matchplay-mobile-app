import axiosInstance from "../api/axiosInstance"
import { SearchRawgGames } from "../screens/Games/interface/rawg-games";

export function GamesService() {
  const root = '/games'

  async function searchRawgGames(searchRawgGames:SearchRawgGames) {
    try {
      const response = await axiosInstance.get(`${root}/rawg/search`, {
        params: {
          page: searchRawgGames.page,
          pageSize: searchRawgGames.pageSize,
          search: searchRawgGames.search
        }});
      return response.data;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }

  return {
    searchRawgGames,
  }
}