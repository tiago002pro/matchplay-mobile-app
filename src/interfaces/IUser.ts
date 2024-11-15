export interface User {
  id?:number;
  name?:string;
  login?:string;
  password?:string;
  role?:string;
  profileImage?:any;
}

export interface Register {
  name?:string;
  login?:string;
  password?:string;
}