import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import mylistReducer from '../features/mylistSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    mylist: mylistReducer,
  },
});
