import { MatchedStatus } from "enums/MatchedStatus";
import { MatchStatus } from "../enums/MatchStatus";
import { IPerson } from "./IPerson";

export interface IMatch {
  id?:number;
  person?:IPerson;
  matched?:IPerson;
  status?:MatchStatus;
  matchedStatus?:MatchedStatus;
}

export interface IMatchRequest {
  personId?:number;
  matchedId?:number;
  status?:MatchStatus;
}

export interface MatchersDTO {
  id:number;
  personId:number;
  name:string;
  image?:string;
  date:Date;
}
