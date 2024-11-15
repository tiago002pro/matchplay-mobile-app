import axiosInstance from "./axiosInstance"

export function GamesService() {
  const root = '/games'

  async function searchRawgGames(page:number, pageSize:number, search:string) {
    try {
      const response = await axiosInstance.get(`${root}/rawg/search`, {
        params: { page,  pageSize, search }
      });
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