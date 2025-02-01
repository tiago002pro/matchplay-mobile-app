export interface IGame {
  id?:number;
  name?:string;
  image?:string;
}

export interface IRawgGamesResponse {
  count?:number;
  hasNext?:boolean;
  games?:RawgGames[];
}
