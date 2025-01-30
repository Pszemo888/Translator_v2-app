import { Translation } from './data.model';
  
export interface UserRegistrationRequest {
  username: string;
  email: string;
  password: string;
}

export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface UserRegistrationResponse {
    id: number;
    username: string;
    email: string;
  }
  
  export interface User {
    id: string;
    username: string;
    role: string;
    translations: Translation[];
  }
  
  export interface UserLoginResponse {
    message: string;
    token: string;
    user: User;
  }