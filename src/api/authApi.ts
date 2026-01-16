import client from './client';

export interface RegisterRequest {
  email: string;
  password: string;
  displayName: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  email: string;
  displayName: string;
}

export interface UserInfo {
  email: string;
  displayName: string;
  createdAt: string;
}

export const authApi = {
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await client.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await client.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  getCurrentUser: async (): Promise<UserInfo> => {
    const response = await client.get<UserInfo>('/auth/me');
    return response.data;
  },
};
