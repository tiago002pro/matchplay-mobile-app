import axiosInstance from "./axiosInstance";

export function ChatService() {
  const root = '/chat';

  async function getAllByPersonId(personId:number, search:string, page:number, pageSize:number) {
    try {
      const response = await axiosInstance.get(`${root}/${personId}?search=${search}&page=${page}&pageSize=${pageSize}`);
      return response.data;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }

  return {
    getAllByPersonId,
  }
}