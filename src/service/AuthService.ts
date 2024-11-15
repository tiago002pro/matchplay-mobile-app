import { Register } from '../interfaces/IUser';
import axiosInstance from './axiosInstance';
import jwtDecode from 'jwt-decode';

export function AuthService() {
  const root = '/auth';

  async function signIn(login:string, password:string):Promise<any> {
    try {
      const response = await axiosInstance.post(`/${root}/signin`, { login, password })
      const tokenDecoded:any = jwtDecode(response.data.token);
      return {
        token: response.data.token,
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

  async function signup(registerUser:Register):Promise<any> {
    try {
      const response = await axiosInstance.post(`${root}/signup`, registerUser)
      return response.data
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
