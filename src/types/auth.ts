export interface RegisterData {
  username: string;
  email: string;
  id: number;
}

export interface RegisterResponse {
  success: boolean;
  data?: RegisterData;
}

export interface LoginResponse {
  success: boolean;
  data?: {
    username: string;
    email: string;
    id: number;
  };
}
