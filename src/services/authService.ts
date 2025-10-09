import type {
  LoginForm,
  LoginRes,
  LogoutRes,
  RegisterForm,
  RegisterRes,
} from "../types/auth";
import axios from "../services/axiosClient";

export const authService = {
  async signin(data: LoginForm): Promise<LoginRes> {
    const res = await axios.post<LoginRes>("auth/login", data);
    return res.data;
  },
  async signup(data: RegisterForm): Promise<RegisterRes> {
    const res = await axios.post<RegisterRes>("auth/register", data);
    return res.data;
  },
  async signout(): Promise<LogoutRes> {
    const res = await axios.post<LogoutRes>("auth/logout");
    return res.data;
  },
};
