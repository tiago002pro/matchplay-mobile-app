import { IApiResponse } from '../interfaces/IApiResponse';
import { IRegister, IToken } from '../interfaces/IUser';
import axiosInstance from './axiosInstance';
import jwtDecode from 'jwt-decode';
import { showMessage } from 'react-native-flash-message';

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
          login: tokenDecoded.email,
          username: tokenDecoded.username,
          personId: tokenDecoded.personId,
          gamerProfileId: tokenDecoded.gamerProfileId,
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
      showMessage({
        message: response.data.result,
        type: "success",
        duration: 3000
      })
      
      return response.data.result
    } catch (error) {
      if (error.response) {
        if (error.response.status == 409) {
          showMessage({
            message: "Erro ao criar conta",
            description: error.response.data.errorMessage,
            type: "danger",
            duration: 3000
          })
          throw new Error(error.response.data.errorMessage);
        }
      } else {
        showMessage({
          message: "Erro ao criar conta",
          description: error.response.data.errorMessage,
          type: "danger",
          duration: 3000
        })
        throw new Error(error.response.data.errorMessage);
      }
    }
  }

  return {
    signIn,
    signup,
  }
}
