import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  alert: {},
  show: false,
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state, action) => {
      state.alert = action.payload.alert;
      state.show = true;
    },
    closeAlert: state => {
      state.show = false;
    },
  },
});

export const { closeAlert, setAlert } = alertSlice.actions;

export default alertSlice.reducer;
