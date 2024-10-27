
export interface SearchRawgGames {
  page?:number,
  pageSize?:number,
  search?:string,
}

export interface RawgGamesResponse {
  count?:number;
  hasNext?:boolean;
  games?:RawgGames[];
}

export interface RawgGames {
  name:string;
  backgroundImage?:string;
}
