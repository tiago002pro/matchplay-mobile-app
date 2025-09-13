export interface Game {
  id: number;
  name: string;
  image?: string;
  idRawgGame: number;
  platforms: GamePlatform[];
  // releaseDate: string; Será implementado no back
  // metacritic: number; Será implementado no back
}

export interface GamePlatform {
  id: number;
  name: string;
  idRawgGame?: number;
}

export interface NewGameRequest {
  idRawgGame: number;
  name: string;
  backgroundImage: string;
  idPlatform: number;
  namePlatform: string;
}
