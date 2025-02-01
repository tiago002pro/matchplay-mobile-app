export interface IUser {
  id?:number;
  name?:string;
  login?:string;
  password?:string;
  role?:string;
  profileImage?:any;
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