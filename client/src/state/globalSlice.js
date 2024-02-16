import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alertMessage: "",
  alertSeverity: "",
  alertOpen: false,
  title: "",
  description: "",
  completed: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setALert: (state, action) => {
      state.alertMessage = action.payload.alertMessage;
      state.alertSeverity = action.payload.alertSeverity;
      state.alertOpen = true;
    },
    clearAlert: state => {
      state.alertMessage = "";
      state.alertSeverity = "";
      state.alertOpen = false;
    },
    setFields: (state, action) => {
      const { title, description, completed } = action.payload;
      state.title = title !== undefined ? title : state.title;
      state.description =
        description !== undefined ? description : state.description;
      state.completed = completed !== undefined ? completed : state.completed;
    },
  },
});

export const { setALert, clearAlert, setFields } = globalSlice.actions;

export default globalSlice.reducer;
