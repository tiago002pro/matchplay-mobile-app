export interface IChat {
  id?:number;
  sequence?:number;
  senderId?:number;
  recipientId?:number;
  text?:string;
  date?:Date;
  isRead?:boolean;
}