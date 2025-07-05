import { createSlice } from '@reduxjs/toolkit';
//import api from '../api/axios'
import axios from 'axios';
import axiosInstance from '../axiosInstance';

const initialState = {
  tasks: null,
  loading: false,
  error: null,
  editingId: null,
  filterStatus: 'ALL' // filtro por estado
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // Acciones síncronas
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    setEditingId: (state, action) => {
      state.editingId = action.payload;
    },
    resetForm: (state) => {
      state.editingId = null;
    },
    
    // Acciones para manejar estado de carga/error
    fetchTasksStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTasksSuccess: (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
    },
    fetchTasksFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Operaciones CRUD
    addTaskSuccess: (state, action) => {
      state.tasks = [...(state.tasks || []), action.payload];
    },
    updateTaskSuccess: (state, action) => {
      state.tasks = state.tasks.map(task => 
        task.id === action.payload.id ? action.payload : task
      );
    },
    deleteTaskSuccess: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    setFilterStatus: (state, action) => { //filtro
      state.filterStatus = action.payload;
    }
  }
});

export const { 
  setTasks, 
  setEditingId, 
  resetForm,
  fetchTasksStart,
  fetchTasksSuccess,
  fetchTasksFailure,
  addTaskSuccess,
  updateTaskSuccess,
  deleteTaskSuccess,
  setFilterStatus 
} = tasksSlice.actions;


export const fetchTasks = () => async (dispatch) => {
  try {
    dispatch(fetchTasksStart());
    const response = await axiosInstance.get('tareas/');
    dispatch(fetchTasksSuccess(response.data));
  } catch (error) {
    dispatch(fetchTasksFailure(error.message));
  }
};

export const addTask = (taskData) => async (dispatch) => {
  try {
    const response = await axiosInstance.post('tareas/', taskData);
    dispatch(addTaskSuccess(response.data));
  } catch (error) {
    throw error;
  }
};

export const updateTask = (id, taskData) => async (dispatch) => {
  try {
    const response = await axiosInstance.put(`/tareas/${id}/`, taskData);
    dispatch(updateTaskSuccess(response.data));
  } catch (error) {
    throw error;
  }
};

export const deleteTask = (id) => async (dispatch) => {
  try {
    await axiosInstance.delete(`http://127.0.0.1:8000/api/tareas/${id}/`);
    dispatch(deleteTaskSuccess(id));
  } catch (error) {
    throw error;
  }
};

export const selectFilteredTasks = (state) => {
  const { tasks, filterStatus } = state.tasks;
  if (!tasks) return null;
  
  if (filterStatus === 'ALL') return tasks;
  
  return tasks.filter(task => task.estado === filterStatus);
};

export default tasksSlice.reducer;