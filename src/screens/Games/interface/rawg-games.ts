export interface RawgGamesResponse {
  count?:number;
  hasNext?:boolean;
  games?:RawgGames[];
}

export interface RawgGames {
  id:number;
  name:string;
  backgroundImage?:string;
}
