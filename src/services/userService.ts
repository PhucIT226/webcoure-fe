import axios from "./axiosClient";
import type { User, UserResDto, GetAllUserParams } from "../types/user";

const UserService = {
  async getAll(params?: GetAllUserParams): Promise<UserResDto> {
    const res = await axios.get<UserResDto>("/users", { params });
    return res.data;
  },

  async getById(id: string): Promise<User> {
    const res = await axios.get(`/users/${id}`);
    return res.data.data;
  },

  async create(user: Partial<User>, files?: File[]): Promise<User> {
    const formData = new FormData();

    Object.entries(user).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (key === "profile") {
          formData.append(key, JSON.stringify(value)); // ✅ gửi JSON đúng định dạng
        } else {
          formData.append(key, String(value));
        }
      }
    });

    if (files && files.length > 0) {
      formData.append("avatar", files[0]);
    }

    const res = await axios.post<User>("/users", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
  },

  async update(id: string, user: Partial<User>, files?: File[]): Promise<User> {
    const formData = new FormData();

    Object.entries(user).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (key === "profile") {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, String(value));
        }
      }
    });

    if (files && files.length > 0) {
      formData.append("avatar", files[0]);
    }

    const res = await axios.patch<{ status: boolean; message: string; data: User }>(
      `/users/${id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return res.data.data;
  },

  async delete(id: string): Promise<void> {
    await axios.delete(`/users/${id}`);
  },

  async getStudents(params?: GetAllUserParams): Promise<UserResDto> {
    const res = await axios.get<UserResDto>("/users?role=student", { params });
    return res.data;
  },

  async getInstructors(params?: GetAllUserParams): Promise<UserResDto> {
    const res = await axios.get<UserResDto>("/users?role=instructor", { params });
    return res.data;
  },
};

export default UserService;
