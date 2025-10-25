export type UserRes = {
  email: string;
  id: string;
  name: string;
  roleId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type LoginForm = {
  email: string;
  password: string;
  isRemember: boolean;
};

export type LoginRes = {
  accessToken: string;
  refreshToken: string;
  user: UserRes;
};

export type LogoutRes = {
  message: string;
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
export type VerifyEmailRes = {
  message: string;
  success: boolean;
};
