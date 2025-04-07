import { fetchApi, setAuthToken, clearAuthToken } from './index';

export interface User {
  id: number;
  username: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest{
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

export async function login(credentials: LoginRequest){
  const response = await fetchApi<AuthResponse>('/routes/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

  if (response.data?.token){
    setAuthToken(response.data.token);
  }

  return response;
}

export async function register(userData: RegisterRequest){
  const response = await fetchApi<AuthResponse>('/routes/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
  console.log(response);

  if (response.data?.token){
    setAuthToken(response.data.token);
  }

  return response;
}

export function logOut() {
  if (typeof window !== 'undefined'){
    localStorage.removeItem('authToken');
  }
  return { status: 200 };
}