import axios from "./axiosClient";
import type { Category, CategoryResDto, GetAllCategoryParams } from "../types/category";

const CategoryService = {
  async getAll(params?: GetAllCategoryParams): Promise<CategoryResDto> {
    const res = await axios.get<CategoryResDto>("/categories", { params });
    return res.data;
  },

  async getById(id: string): Promise<Category> {
    const res = await axios.get(`/categories/${id}`);
    return res.data.data;
  },

  async create(category: Partial<Category>): Promise<Category> {
    const res = await axios.post<{ status: boolean; message: string; data: Category }>(
      "/categories",
      category,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return res.data.data;
  },

  async update(id: string, category: Partial<Category>): Promise<Category> {
    const res = await axios.patch<{ status: boolean; message: string; data: Category }>(
      `/categories/${id}`,
      category,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return res.data.data;
  },

  async delete(id: string): Promise<void> {
    await axios.delete(`/categories/${id}`);
  },
};

export default CategoryService;
