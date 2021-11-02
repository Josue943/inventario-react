import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  openMenu: false,
};

const navbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    toggleMenu: state => {
      state.openMenu = !state.openMenu;
    },
  },
});

export const { toggleMenu } = navbarSlice.actions;

export default navbarSlice.reducer;
