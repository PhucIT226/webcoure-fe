import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import OrderService from "../services/orderService";
import type { Order, OrderResDto, GetAllOrderParams } from "../types/order";
import type { TAny } from "../types/common";

type OrderState = {
  data: Order[];
  pagination: OrderResDto["pagination"] | null;
  loading: boolean;
  error: string | null;
};

const initialState: OrderState = {
  data: [],
  pagination: null,
  loading: false,
  error: null,
};

// ======================== THUNKS ========================
export const fetchOrders = createAsyncThunk<
  OrderResDto,
  GetAllOrderParams | undefined,
  { rejectValue: string }
>("orders/fetchAll", async (params, { rejectWithValue }) => {
  try {
    return await OrderService.getAll(params);
  } catch (err: TAny) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const fetchOrderById = createAsyncThunk<
  Order,
  string,
  { rejectValue: string }
>("orders/fetchById", async (id, { rejectWithValue }) => {
  try {
    return await OrderService.getById(id);
  } catch (err: TAny) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const createOrder = createAsyncThunk<
  Order,
  Partial<Order>,
  { rejectValue: string }
>("orders/create", async (order, { rejectWithValue }) => {
  try {
    return await OrderService.create(order);
  } catch (err: TAny) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const updateOrder = createAsyncThunk<
  Order,
  { id: string; order: Partial<Order> },
  { rejectValue: string }
>("orders/update", async ({ id, order }, { rejectWithValue }) => {
  try {
    return await OrderService.update(id, order);
  } catch (err: TAny) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const deleteOrder = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("orders/delete", async (id, { rejectWithValue }) => {
  try {
    await OrderService.delete(id);
    return id;
  } catch (err: TAny) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

// ======================== SLICE ========================
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearOrders: (state) => {
      state.data = [];
      state.pagination = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchOrders.fulfilled,
        (state, action: PayloadAction<OrderResDto>) => {
          state.loading = false;
          state.data = action.payload.data;
          state.pagination = action.payload.pagination;
        }
      )
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch by ID
      .addCase(
        fetchOrderById.fulfilled,
        (state, action: PayloadAction<Order>) => {
          const existing = state.data.find((o) => o.id === action.payload.id);
          if (!existing) state.data.push(action.payload);
        }
      )

      // Create
      .addCase(
        createOrder.fulfilled,
        (state, action: PayloadAction<Order>) => {
          state.data.push(action.payload);
        }
      )

      // Update
      .addCase(
        updateOrder.fulfilled,
        (state, action: PayloadAction<Order>) => {
          const index = state.data.findIndex((o) => o.id === action.payload.id);
          if (index !== -1) state.data[index] = action.payload;
        }
      )

      // Delete
      .addCase(
        deleteOrder.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.data = state.data.filter((o) => o.id !== action.payload);
        }
      );
  },
});

export const { clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
