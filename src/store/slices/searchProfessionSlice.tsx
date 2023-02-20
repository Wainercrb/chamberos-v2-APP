import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const searchProfessionSlice = createSlice({
  name: "searchProfession",
  initialState: {
    professionName: "",
    initialized: false,
  },
  reducers: {
    updateProfessionName: (state, action: PayloadAction<string>) => {
      state.professionName = action.payload;

      if (!state.initialized) {
        state.initialized = true;
      }
    },
    setInitialize: (state, action: PayloadAction<boolean>) => {
      state.initialized = action.payload;
    },
  },
});

export const { updateProfessionName, setInitialize } =
  searchProfessionSlice.actions;

export default searchProfessionSlice.reducer;
