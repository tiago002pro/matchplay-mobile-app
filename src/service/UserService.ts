import { IApiResponse } from 'interfaces/IApiResponse';
import axiosInstance from './axiosInstance';

export function UserService() {
  const root = '/user';

  async function updateExpoNotificationToken(id:number, token:string):Promise<string> {
    try {
      const response = await axiosInstance.put<IApiResponse<string>>(`${root}/${id}/update-expo-notification-token?token=${token}`);
      return response.data.result;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }
  return {
    updateExpoNotificationToken,
  }
}