import {createSlice, createAction} from "@reduxjs/toolkit";

const initialState = {
  isFormSubmitted: false,
  user: {
    name: "",
    email: "",
  },
  lastfetchedTimeData: "",
};
export const revertAll = createAction("REVERT_ALL");

const formslice = createSlice({
  name: "form",
  initialState,
  reducers: {
    formsubmit: (state, action) => {
      state.isFormSubmitted = true;
      state.user = {...action.payload};
    },
    userLogOut: (state, action) => {
      state.isFormSubmitted = false;
    },
    getFetchedtime: (state) => {
      state.lastfetchedTimeData = new Date().toLocaleDateString(undefined, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(revertAll, () => initialState);
  },
});

export default formslice.reducer;
export const {formsubmit, getFetchedtime, userLogOut} = formslice.actions;
