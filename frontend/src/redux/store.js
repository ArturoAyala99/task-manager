import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import tasksReducer from './taskSlice';

// Configuración inicial sin tasksReducer
export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer, //(state = null) => state // Reducer temporal
  }
});