export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  user?: any;
}
