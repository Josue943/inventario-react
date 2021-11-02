import { configureStore } from '@reduxjs/toolkit';

import alertSlice from './alertSlice';
import navbarReducer from './navbarSlice';

export default configureStore({ reducer: { navbar: navbarReducer, alert: alertSlice } });
