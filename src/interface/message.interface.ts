export interface Message {
  id?:number;
  senderId?:number;
  recipientId?:number;
  text?:string;
  date?:Date;
  read?:boolean;
}