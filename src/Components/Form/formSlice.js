import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  isFormSubmitted: false,
};

const formslice = createSlice({
  name: "form",
  initialState,
  reducers: {
    formsubmit: (state, action) => {
      state.isFormSubmitted = true;
    },
  },
});

export default formslice.reducer;
export const {formsubmit} = formslice.actions;
