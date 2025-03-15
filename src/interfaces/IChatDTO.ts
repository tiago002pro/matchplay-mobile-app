export interface ChatDTO {
  id:number;
  personId:number;
  name:string;
  lastMessage:string;
  dateLastMessage:Date;
  image?:string;
  date:Date;
}
