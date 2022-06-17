import { createSlice } from "@reduxjs/toolkit";

const replySlice = createSlice({
  name: "reply",
  initialState: {
    reply: [],
    scroll: null,
  },
  reducers: {
    replies: (state, action) => {
      state.reply = [];
      state.reply.push(action.payload);
    },
    clearReplies: (state, action) => {
      state.reply = action.payload;
    },
    scrollReply: (state, action) => {
      state.scroll = action.payload;
    },
  },
});

export const { replies, clearReplies, scrollReply } = replySlice.actions;
export default replySlice.reducer;
