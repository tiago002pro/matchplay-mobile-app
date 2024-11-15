export interface Chat {
  id?:number;
  sequence?:number;
  senderId?:number;
  recipientId?:number;
  text?:string;
  date?:Date;
  read?:boolean;
}