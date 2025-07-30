import { IGame } from "./IGames";

export interface IPerson {
  id:number;
  name?:string;
  gender?:string;
  dateBirth?:string;
  profileImage?:any;
  userId:number;
  gamerProfile:IGamerProfile;
  country:string;
  state:string;
  city:string;
}

export interface IGamerProfile {
  id:number;
  bio?:string;
  language?:string;
  gamerPlatform:IGamerPlatform;
  gamerPeriod:IGamerPeriod;
  games?:IGame[];
}

export interface IGamerPlatform {
  id:number;
  namePlatform?:string;
  username?:string;
  playstation?:boolean;
  xbox?:boolean;
  pcMac?:boolean;
  nitendoSwich?:boolean;
  mobile?:boolean;
  vr?:boolean;
  microsoftXboxCloud?:boolean;
  nvidiaCloud?:boolean;
  amazonLuna?:boolean;
}

export interface IGamerPeriod {
  id:number;
  startTime?:any;
  endTime?:any;
  sunday:IPeriod;
  monday:IPeriod;
  tuesday:IPeriod;
  wednesday:IPeriod;
  thursday:IPeriod;
  friday:IPeriod;
  saturday:IPeriod;
}

export interface IPeriod {
  id:number;
  morning:boolean;
  afternoon:boolean;
  night:boolean;
}
