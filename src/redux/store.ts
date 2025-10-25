import { persistReducer } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "./profileSlice";
import courseSlice from "./courseSlice";
import userSlice from "./userSlice";
import authSlice from "./authSlice";
import dashboardSlice from "./dashboardSlice";
import categorySlice from "./categorySlice";
import orderSlice from "./orderSlice";
import cartSlice from "./cartSlice";
import chatSlice from "./chatSlice";
import reviewSlice from "./reviewSlice";
import couponSlice from "./couponSlice";
import lessonSlice from "./lessonSlice";
import paymentSlice from "./paymentSlice";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, authSlice);

export const store = configureStore({
  reducer: {
    profile: profileSlice,
    auth: persistedReducer,
    dashboard: dashboardSlice,
    course: courseSlice,
    user: userSlice,
    category: categorySlice,
    order: orderSlice,
    review: reviewSlice,
    coupon: couponSlice,
    lesson: lessonSlice,
    payment: paymentSlice,
    cart: cartSlice,
    chat: chatSlice,
  },
});
export const persitor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
