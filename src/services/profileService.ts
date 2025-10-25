import axios from "./axiosClient";
import type { Profile, ProfileResDto } from "../types/profile";

const ProfileService = {
  async getProfile(): Promise<Profile> {
    const res = await axios.get<ProfileResDto>("/profiles/me");
    return res.data.data;
  },

  async updateProfile(
    profile: Partial<Profile>,
    file?: File
  ): Promise<Profile> {
    const formData = new FormData();
    Object.entries(profile).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });
    if (file) formData.append("avatar", file);

    const res = await axios.patch<ProfileResDto>("/profiles/me", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data.data;
  },
};

export default ProfileService;