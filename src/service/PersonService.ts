import { IApiResponse } from "../interfaces/IApiResponse";
import { IPerson } from "../interfaces/IPerson";
import axiosInstance from "./axiosInstance";

export function PersonService() {
  const root = '/person';

  async function getById(id:number):Promise<IPerson> {
    try {
      const response = await axiosInstance.get<IApiResponse<IPerson>>(`${root}/${id}`);
      return response.data.result;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }

  async function uploadImageProfile(id:any, firebaseUrl:string):Promise<void> {
    try {
      await axiosInstance.patch<IApiResponse<string>>(`${root}/${id}/upload-image-profile?firebaseUrl=${firebaseUrl}`);
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }

  async function getPersonsToMatch():Promise<IPerson[]> {
    try {
      const response = await axiosInstance.post<IApiResponse<IPerson[]>>(`${root}/match`);
      return response.data.result;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }

  return {
    getById,
    uploadImageProfile,
    getPersonsToMatch,
  }
}