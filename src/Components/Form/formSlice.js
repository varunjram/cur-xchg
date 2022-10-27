import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  isFormSubmitted: false,
  user: {
    name: "fgh",
    email: "fff",
  },
  lastfetchedTimeData: "",
};

const formslice = createSlice({
  name: "form",
  initialState,
  reducers: {
    formsubmit: (state, action) => {
      state.isFormSubmitted = true;
      state.user = {...action.payload};
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
});

export default formslice.reducer;
export const {formsubmit, getFetchedtime} = formslice.actions;
