import { IPageable } from "interfaces/IPageable";
import { IApiResponse } from "../interfaces/IApiResponse";
import { IMatch, MatchersDTO } from "../interfaces/IMatch";
import axiosInstance from "./axiosInstance";
import { MatchedStatus } from "enums/MatchedStatus";
import { MatchStatus } from "enums/MatchStatus";

export function MatchService() {
  const root = '/match';

  async function saveMatch(match:IMatch) {
    try {
      const response = await axiosInstance.post<IApiResponse<any>>(`${root}`, match);
      return response.data;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }

  async function searchMatchers(personId: number, statusList: MatchStatus[], page: number, pageSize: number) {
    try {
      const response = await axiosInstance.get<IApiResponse<IPageable<MatchersDTO[]>>>(`${root}/matched/${personId}?statusList=${statusList}&page=${page}&pageSize=${pageSize}`);
      return response.data;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }

  async function manageMatches(id: number, matchedStatus: MatchedStatus) {
    try {
      const response = await axiosInstance.post<string>(`${root}/${id}?matchedStatus=${matchedStatus}`);
      return response.data;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }

  return {
    saveMatch,
    searchMatchers,
    manageMatches,
  }
}