
import { apiRequest } from './api';

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export const authService = {
  async googleLogin(token: string): Promise<AuthResponse> {
    const response = await apiRequest('/auth/google', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
    
    localStorage.setItem('authToken', response.token);
    
    return response;
  },

  async logout(): Promise<void> {
    await apiRequest('/auth/logout', {
      method: 'POST',
    });
    
    localStorage.removeItem('authToken');
  },

  async getCurrentUser() {
    return apiRequest('/auth/me');
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }
};
