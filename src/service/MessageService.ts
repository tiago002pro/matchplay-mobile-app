import axiosInstance from "../api/axiosInstance";
import { Message } from "../interface/message.interface";

export function MessageService() {
  const root = 'message';

  async function saveMessage(message:Message) {
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