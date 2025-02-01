export interface IApiResponse<T> {
  result?:T;
  statusCode?:number;
  errorMessage?:string;
}
