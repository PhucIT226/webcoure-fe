import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import CourseService from "../services/courseService";
import type { Course, CourseResDto, GetAllCourseParams } from "../types/course";
import type { TAny } from "../types/common";

type CourseState = {
  data: Course[];
  pagination: CourseResDto["pagination"] | null;
  loading: boolean;
  error: string | null;
};

const initialState: CourseState = {
  data: [],
  pagination: null,
  loading: false,
  error: null,
};

// ======================== THUNKS ========================
export const fetchCourses = createAsyncThunk<
  CourseResDto,
  GetAllCourseParams | undefined,
  { rejectValue: string }
>("courses/fetchAll", async (params, { rejectWithValue }) => {
  try {
    return await CourseService.getAll(params);
  } catch (err: TAny) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const fetchCourseById = createAsyncThunk<
  Course,
  string,
  { rejectValue: string }
>("courses/fetchById", async (id, { rejectWithValue }) => {
  try {
    return await CourseService.getById(id);
  } catch (err: TAny) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const createCourse = createAsyncThunk<
  Course,
  Partial<Course>,
  { rejectValue: string }
>("courses/create", async (course, { rejectWithValue }) => {
  try {
    return await CourseService.create(course);
  } catch (err: TAny) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const updateCourse = createAsyncThunk<
  Course,
  { id: string; course: Partial<Course> },
  { rejectValue: string }
>("courses/update", async ({ id, course }, { rejectWithValue }) => {
  try {
    return await CourseService.update(id, course);
  } catch (err: TAny) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const deleteCourse = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("courses/delete", async (id, { rejectWithValue }) => {
  try {
    await CourseService.delete(id);
    return id;
  } catch (err: TAny) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

// ======================== SLICE ========================
const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    clearCourses: (state) => {
      state.data = [];
      state.pagination = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCourses.fulfilled,
        (state, action: PayloadAction<CourseResDto>) => {
          state.loading = false;
          state.data = action.payload.data.map((course: TAny) => ({
            ...course,
          }));
          state.pagination = action.payload.pagination;
        }
      )
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(
        fetchCourseById.fulfilled,
        (state, action: PayloadAction<Course>) => {
          const existing = state.data.find((c) => c.id === action.payload.id);
          if (!existing) state.data.push(action.payload);
        }
      )
      .addCase(
        createCourse.fulfilled,
        (state, action: PayloadAction<Course>) => {
          state.data.push(action.payload);
        }
      )
      .addCase(
        updateCourse.fulfilled,
        (state, action: PayloadAction<Course>) => {
          const index = state.data.findIndex((c) => c.id === action.payload.id);
          if (index !== -1) state.data[index] = action.payload;
        }
      )
      .addCase(
        deleteCourse.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.data = state.data.filter((c) => c.id !== action.payload);
        }
      );
  },
});

export const { clearCourses } = courseSlice.actions;
export default courseSlice.reducer;
