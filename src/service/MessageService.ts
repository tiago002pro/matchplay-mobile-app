import axiosInstance from "./axiosInstance";

export function MessageService() {
  const root = '/message';

  async function getMessages(chatId:number, page:number, pageSize:number) {
    try {
      const response = await axiosInstance.get(`${root}/chat/${chatId}?page=${page}&pageSize=${pageSize}`);
      return response.data;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }

  return {
    getMessages,
  }
}