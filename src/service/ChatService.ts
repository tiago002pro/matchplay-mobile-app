import { IApiResponse } from "interfaces/IApiResponse";
import axiosInstance from "./axiosInstance";
import { IPageable } from "interfaces/IPageable";
import { ChatDTO } from "interfaces/IChatDTO";

export function ChatService() {
  const root = '/chat';

  async function getAllByPersonId(personId:number, search:string, page:number, pageSize:number): Promise<IApiResponse<IPageable<ChatDTO[]>>> {
    try {
      const response = await axiosInstance.get<IApiResponse<IPageable<ChatDTO[]>>>(`${root}/${personId}?search=${search}&page=${page}&pageSize=${pageSize}`);
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