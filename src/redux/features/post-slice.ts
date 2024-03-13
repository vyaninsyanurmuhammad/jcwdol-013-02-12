import { createSlice } from "@reduxjs/toolkit";
import { getPostsThunk } from "./post-thunk";
import { postInitialState } from "./post-state";

const postSlice = createSlice({
  name: "post",
  initialState: postInitialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getPostsThunk.fulfilled, (state, action) => {
      state.posts = [...action.payload];
    });
  },
});

export const {} = postSlice.actions;

export default postSlice.reducer;
