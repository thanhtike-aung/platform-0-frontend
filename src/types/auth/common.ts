export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

export interface AuthState {
  isAuthenticated: boolean | null;
  token: string | null;
  currentUser?: User | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string | null;
  user?: User;
}
