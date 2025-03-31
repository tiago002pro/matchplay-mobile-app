export interface ChatDTO {
  id:number;
  personId:number;
  name:string;
  lastMessage:string;
  dateLastMessage:string;
  image?:string;
  date:Date;
  unreadCount:number;
}
