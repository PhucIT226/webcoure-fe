import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import UserService from "../services/userService";
import type { User, UserResDto, GetAllUserParams } from "../types/user";
import type { TAny } from "../types/common";

type UserState = {
  data: User[];
  pagination: UserResDto["pagination"] | null;
  loading: boolean;
  error: string | null;
};

const initialState: UserState = {
  data: [],
  pagination: null,
  loading: false,
  error: null,
};

// Thunks
export const fetchUsers = createAsyncThunk<
  UserResDto,
  GetAllUserParams | undefined,
  { rejectValue: string }
>("users/fetchAll", async (params, { rejectWithValue }) => {
  try {
    return await UserService.getAll(params);
  } catch (err: TAny) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

// Lấy user theo id
export const fetchUserById = createAsyncThunk<User, string, { rejectValue: string }>(
  "users/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      return await UserService.getById(id);
    } catch (err: TAny) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Tạo user mới
export const createUser = createAsyncThunk<User, Partial<User>, { rejectValue: string }>(
  "users/create",
  async (user, { rejectWithValue }) => {
    try {
      return await UserService.create(user);
    } catch (err: TAny) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Cập nhật user
export const updateUser = createAsyncThunk<
  User,
  { id: string; user: Partial<User> },
  { rejectValue: string }
>("users/update", async ({ id, user }, { rejectWithValue }) => {
  try {
    return await UserService.update(id, user);
  } catch (err: TAny) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

// Xóa user
export const deleteUser = createAsyncThunk<string, string, { rejectValue: string }>(
  "users/delete",
  async (id, { rejectWithValue }) => {
    try {
      await UserService.delete(id);
      return id;
    } catch (err: TAny) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ======================= Slice =======================
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearUsers: (state) => {
      state.data = [];
      state.pagination = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<UserResDto>) => {
        state.loading = false;
        state.data = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch by id
      .addCase(fetchUserById.fulfilled, (state, action: PayloadAction<User>) => {
        const exists = state.data.find((u) => u.id === action.payload.id);
        if (!exists) state.data.push(action.payload);
      })

      // Create
      .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.data.push(action.payload);
      })

      // Update
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) state.data[index] = action.payload;
      })

      // Delete
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.data = state.data.filter((u) => u.id !== action.payload);
      });
  },
});

export const { clearUsers } = userSlice.actions;
export default userSlice.reducer;
