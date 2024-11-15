export interface IRawgGamesResponse {
  count?:number;
  hasNext?:boolean;
  games?:IRawgGames[];
}

export interface IRawgGames {
  id:number;
  name:string;
  backgroundImage?:string;
}
