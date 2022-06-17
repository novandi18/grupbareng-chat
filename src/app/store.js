import { configureStore } from "@reduxjs/toolkit";
import replySlice from "../features/chat/replySlice";

export const store = configureStore({
  reducer: {
    reply: replySlice,
  },
});
