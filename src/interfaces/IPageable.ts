export interface IPageable<T> {
  content:T;
  pageable:Pageable;
  numberOfElements:number;
  last:boolean,
  totalElements:number,
  totalPages:number,
  first:boolean,
}

interface Pageable {
  pageNumber:number,
  pageSize:number,
}
