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

  async function readAllMessages(chatId:number, senderId:number) {
    try {
      const response = await axiosInstance.put(`${root}/chat/${chatId}?senderId=${senderId}`);
      return response.data;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }

  async function getUnreadCount(personId:number) {
    try {
      const response = await axiosInstance.get(`${root}/unread-count/person/${personId}`);
      return response.data;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }

  return {
    getMessages,
    readAllMessages,
    getUnreadCount,
  }
}
