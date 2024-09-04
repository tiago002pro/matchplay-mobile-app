import axios from 'axios';
import { RegisterUser } from '../interface/register.interface';

const api = axios.create({
  baseURL: 'http://10.0.0.112:8080/matchplay-api',
});

class AuthService {
  private root!: string;

  constructor() {
    this.root = "/auth"
  }

  public async login(login:string, password:string) {
    try {
      const response = await api.post(`${this.root}/login`, { login, password })
      return response.data
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }

  public async signup(registerUser:RegisterUser):Promise<any> {
    try {
      const response = await api.post(`${this.root}/signup`, registerUser)
      return response.data
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }
}

export default new AuthService();