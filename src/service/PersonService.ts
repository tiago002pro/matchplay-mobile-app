import { IApiResponse } from "../interfaces/IApiResponse";
import { IPerson } from "../interfaces/IPerson";
import axiosInstance from "./axiosInstance";

export function PersonService() {
  const root = '/person';

  async function getByUserId(userId:number) {
    try {
      const response = await axiosInstance.get<IApiResponse<IPerson>>(`${root}/user/${userId}`);
      return response.data.result;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }

  async function uploadImageProfile(id:any, firebaseUrl:string) {
    try {
      await axiosInstance.patch<IApiResponse<string>>(`${root}/upload-image-profile/${id}?firebaseUrl=${firebaseUrl}`);
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }

  return {
    getByUserId,
    uploadImageProfile,
  }
}