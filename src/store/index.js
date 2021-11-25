import { configureStore } from '@reduxjs/toolkit';

import alert from './alertSlice';
import auth from './authSlice';
import cart from './cartSlice';
import navbar from './navbarSlice';

export default configureStore({ reducer: { navbar, alert, auth, cart } });
