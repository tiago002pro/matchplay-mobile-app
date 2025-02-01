import { IApiResponse } from '../interfaces/IApiResponse';
import { IRegister, IToken } from '../interfaces/IUser';
import axiosInstance from './axiosInstance';
import jwtDecode from 'jwt-decode';

export function AuthenticationService() {
  const root = '/auth';

  async function signIn(email:string, password:string):Promise<any> {
    try {
      const response = await axiosInstance.post<IApiResponse<IToken>>(`${root}/signin`, { email, password })
      
      const tokenDecoded:any = jwtDecode(response.data.result?.token || '');
      return {
        token: response.data.result?.token,
        user: {
          id: parseInt(tokenDecoded.sub),
          name: tokenDecoded.name,
          login: tokenDecoded.login,
        }
      }
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }

  async function signup(registerUser:IRegister):Promise<any> {
    try {
      const response = await axiosInstance.post<IApiResponse<string>>(`${root}/signup`, registerUser)
      return response.data.result
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }

  return {
    signIn,
    signup,
  }
}
