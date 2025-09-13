export interface RawgPlatformsResponse {
  count?: number;
  hasNext?: boolean;
  platforms?: RawgPlatform[];
}

interface RawgPlatform {
  id: number;
  name: string;
  gamesCount: number;
  backgroundImage: string;
}

export interface RawgGamesResponse {
  count?: number;
  hasNext?: boolean;
  games?: RawgGames[];
}

export interface RawgGames {
  id: number;
  name: string;
  backgroundImage?: string;
  platforms: RawgGamePlatform[];
  releaseDate: string;
  metacritic: number;
}

export interface RawgGamePlatform {
  id: number;
  name: string;
}
