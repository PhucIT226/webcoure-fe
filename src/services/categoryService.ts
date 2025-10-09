import axios from "./axiosClient";
import type { Category, CategoryResDto, GetAllCategoryParams } from "../types/category";

const CategoryService = {
  async getAll(params?: GetAllCategoryParams): Promise<CategoryResDto> {
    const res = await axios.get<CategoryResDto>("/categories", { params });
    return res.data;
  },

  async getById(id: string): Promise<Category> {
    const res = await axios.get<Category>(`/categories/${id}`);
    return res.data;
  },

  async create(category: Partial<Category>): Promise<Category> {
    const res = await axios.post<Category>("/categories", category);
    return res.data;
  },

  async update(id: string, category: Partial<Category>): Promise<Category> {
    const res = await axios.put<Category>(`/categories/${id}`, category);
    return res.data;
  },

  async delete(id: string): Promise<void> {
    await axios.delete(`/categories/${id}`);
  },
};

export default CategoryService;
