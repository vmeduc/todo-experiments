import { createSlice } from "@reduxjs/toolkit";

const initialState = { loading: false };

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading: (state, { payload: loadingState }) => {
      state.loading = loadingState;
    }
  }
});

export const { setLoading } = appSlice.actions;

export default appSlice.reducer;