type RawgGameProps = {
  game:RawgGames;
}

type RawgGames = {
  id:number;
  name:string;
  backgroundImage?:string;
  platforms:Platform[];
}

type Platform = {
  id:number;
  name:string;
}