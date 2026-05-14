export interface IMessageDTO {
  id:number;
  sender:MessageSenderDTO;
  content:string;
  isRead:boolean;
  date:string;
  chatId:number;
}

interface MessageSenderDTO {
  id:number
  name:string
  image?:string
}
