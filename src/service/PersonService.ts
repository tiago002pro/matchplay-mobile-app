import axiosInstance from "../api/axiosInstance";

export function PersonService() {
  const root = 'person';

  async function getByUserId(userId:number) {
    try {
      const response = await axiosInstance.get(`/${root}/user/${userId}`);
      return response.data;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }

  async function uploadImageProfile(id:any, firebaseUrl:string) {
    try {
      await axiosInstance.patch(`/${root}/upload-image-profile/${id}?firebaseUrl=${firebaseUrl}`);

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