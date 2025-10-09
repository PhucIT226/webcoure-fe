import axios from "./axiosClient";
import type { User, UserResDto, GetAllUserParams } from "../types/user";

const UserService = {
  async getAll(params?: GetAllUserParams): Promise<UserResDto> {
    const res = await axios.get<UserResDto>("/users", { params });
    return res.data;
  },

  async getById(id: string): Promise<User> {
    const res = await axios.get<User>(`/users/${id}`);
    return res.data;
  },

  async create(user: Partial<User>): Promise<User> {
    const res = await axios.post<User>("/users", user);
    return res.data;
  },

  async update(id: string, user: Partial<User>): Promise<User> {
    const res = await axios.put<User>(`/users/${id}`, user);
    return res.data;
  },

  async delete(id: string): Promise<void> {
    await axios.delete(`/users/${id}`);
  },
};

export default UserService;
