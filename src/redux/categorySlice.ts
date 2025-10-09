import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import CategoryService from "../services/categoryService";
import type { Category, CategoryResDto, GetAllCategoryParams } from "../types/category";
import type { TAny } from "../types/common";

type CategoryState = {
  data: Category[];
  pagination: CategoryResDto["pagination"] | null;
  loading: boolean;
  error: string | null;
};

const initialState: CategoryState = {
  data: [],
  pagination: null,
  loading: false,
  error: null,
};

// Thunks
export const fetchCategories = createAsyncThunk<
  CategoryResDto,
  GetAllCategoryParams | undefined,
  { rejectValue: string }
>("categories/fetchAll", async (params, { rejectWithValue }) => {
  try {
    return await CategoryService.getAll(params);
  } catch (err: TAny) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const fetchCategoryById = createAsyncThunk<
  Category,
  string,
  { rejectValue: string }
>("categories/fetchById", async (id, { rejectWithValue }) => {
  try {
    return await CategoryService.getById(id);
  } catch (err: TAny) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const createCategory = createAsyncThunk<
  Category,
  Partial<Category>,
  { rejectValue: string }
>("categories/create", async (category, { rejectWithValue }) => {
  try {
    return await CategoryService.create(category);
  } catch (err: TAny) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const updateCategory = createAsyncThunk<
  Category,
  { id: string; category: Partial<Category> },
  { rejectValue: string }
>("categories/update", async ({ id, category }, { rejectWithValue }) => {
  try {
    return await CategoryService.update(id, category);
  } catch (err: TAny) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const deleteCategory = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("categories/delete", async (id, { rejectWithValue }) => {
  try {
    await CategoryService.delete(id);
    return id;
  } catch (err: TAny) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

// Slice
const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    clearCategories: (state) => {
      state.data = [];
      state.pagination = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<CategoryResDto>) => {
          state.loading = false;
          state.data = action.payload.data;
          state.pagination = action.payload.pagination;
        }
      )
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(
        fetchCategoryById.fulfilled,
        (state, action: PayloadAction<Category>) => {
          const existing = state.data.find((c) => c.id === action.payload.id);
          if (!existing) state.data.push(action.payload);
        }
      )
      .addCase(
        createCategory.fulfilled,
        (state, action: PayloadAction<Category>) => {
          state.data.push(action.payload);
        }
      )
      .addCase(
        updateCategory.fulfilled,
        (state, action: PayloadAction<Category>) => {
          const index = state.data.findIndex((c) => c.id === action.payload.id);
          if (index !== -1) state.data[index] = action.payload;
        }
      )
      .addCase(
        deleteCategory.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.data = state.data.filter((c) => c.id !== action.payload);
        }
      );
  },
});

export const { clearCategories } = categorySlice.actions;
export default categorySlice.reducer;
