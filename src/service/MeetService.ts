import axiosInstance from "../api/axiosInstance";

export function MeetService() {
  const root = '/meet';

  async function searchAllPeopleToMeet() {
    try {
      const response = await axiosInstance.get(`/${root}/search-all-people-to-meet`);
      return response.data;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }

  return {
    searchAllPeopleToMeet,
  }
}