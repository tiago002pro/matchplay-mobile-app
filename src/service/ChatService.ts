import axiosInstance from "./axiosInstance";
import { Chat } from "../interfaces/IChat";

export function ChatService() {
  const root = '/chat';

  async function saveMessage(message:Chat) {
    try {
      const response = await axiosInstance.post(`/${root}/save`, message);
      return response.data;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }

  async function getAll(senderId:number, receiverId:number) {
    try {
      const response = await axiosInstance.get(`/${root}/chat?senderId=${senderId}&receiverId=${receiverId}`);
      return response.data;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }

  return {
    saveMessage,
    getAll,
  }
}