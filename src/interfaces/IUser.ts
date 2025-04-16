export interface IUser {
  id:number;
  name:string;
  login:string;
  password:string;
  role:UserRole;
  personId:number;
  gamerProfileId:number;
  expoNotificationToken?:string;
}

export interface IRegister {
  name?:string;
  username?:string;
  email?:string;
  password?:string;
}

export interface IToken {
  token:string;
}

enum UserRole {
  ADMIN = "admin",
  USER = "user"
}