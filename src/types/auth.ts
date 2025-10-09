export type LoginForm = {
  email: string;
  password: string;
  isRemember: boolean;
};

export type LoginRes = {
  accessToken: string;
  refreshToken: string;
  user: string;
};

export type LogoutRes = {
  message: string;
};

export type UserRes = {
  email: string;
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterRes {
  message: string;
}
