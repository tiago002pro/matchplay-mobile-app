export interface IGame {
  id:number;
  name:string;
  image?:string;
  idRawgGame:number;
  platforms:IGamePlatform[],
}

export interface IGamePlatform {
  id:number;
  name:string;
  idRawgGame?:number;
}

export interface IRawgGamesResponse {
  count?:number;
  hasNext?:boolean;
  games?:RawgGames[];
}

export interface IRawgPlatformsResponse {
  count?:number;
  hasNext?:boolean;
  platforms?:IPlatform[];
}

export interface IPlatform {
  id:number;
  name:string;
  gamesCount:number;
  backgroundImage:string;
}
