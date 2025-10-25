// src/redux/lessonSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import LessonService from "../services/lessonService";
import type { Lesson } from "../types/lesson";

// ==== Async Thunks ====

export const fetchLessons = createAsyncThunk(
  "lessons/fetchLessons",
  async (params: { page?: number; pageSize?: number; courseId?: string }) => {
    return await LessonService.getLessons(params);
  }
);

export const fetchLessonById = createAsyncThunk(
  "lessons/fetchLessonById",
  async (id: string) => {
    return await LessonService.getLessonById(id);
  }
);

export const createLesson = createAsyncThunk(
  "lessons/createLesson",
  async (data: Partial<Lesson>) => {
    return await LessonService.createLesson(data);
  }
);

export const updateLesson = createAsyncThunk(
  "lessons/updateLesson",
  async ({ id, data }: { id: string; data: Partial<Lesson> }) => {
    return await LessonService.updateLesson(id, data);
  }
);

export const deleteLesson = createAsyncThunk(
  "lessons/deleteLesson",
  async (id: string) => {
    return await LessonService.deleteLesson(id);
  }
);

// ==== Slice ====
interface LessonState {
  lessons: Lesson[];
  currentLesson: Lesson | null;
  loading: boolean;
  error: string | null;
}

const initialState: LessonState = {
  lessons: [],
  currentLesson: null,
  loading: false,
  error: null,
};

const lessonSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // --- Fetch lessons ---
      .addCase(fetchLessons.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLessons.fulfilled, (state, action) => {
        state.loading = false;
        state.lessons = action.payload.data;
      })
      .addCase(fetchLessons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch lessons";
      })
      // --- Fetch lesson by id ---
      .addCase(fetchLessonById.fulfilled, (state, action) => {
        state.currentLesson = action.payload.data;
      })
      // --- Create lesson ---
      .addCase(createLesson.fulfilled, (state, action) => {
        state.lessons.push(action.payload.data);
      })
      // --- Update lesson ---
      .addCase(updateLesson.fulfilled, (state, action) => {
        const index = state.lessons.findIndex(
          (l) => l.id === action.payload.data.id
        );
        if (index !== -1) state.lessons[index] = action.payload.data;
      })
      // --- Delete lesson ---
      .addCase(deleteLesson.fulfilled, (state, action) => {
        state.lessons = state.lessons.filter((l) => l.id !== action.meta.arg);
      });
  },
});

export default lessonSlice.reducer;