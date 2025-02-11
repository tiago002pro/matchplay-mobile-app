import { MatchStatus } from "../enums/MatchStatus";
import { IPerson } from "./IPerson";

export interface IMatch {
  id?:number;
  person?:IPerson;
  matched?:IPerson;
  status?:MatchStatus;
}

export interface IMatchRequest {
  personId?:number;
  matchedId?:number;
  status?:MatchStatus;
}
