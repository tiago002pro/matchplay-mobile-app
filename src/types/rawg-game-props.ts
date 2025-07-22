type RawgGameProps = {
  game:RawgGames;
}

type RawgGames = {
  id:number;
  name:string;
  backgroundImage?:string;
  platforms:Platform[];
  releaseDate:string;
  metacritic:number;
}

type Platform = {
  id:number;
  name:string;
}