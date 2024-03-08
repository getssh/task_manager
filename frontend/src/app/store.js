import { configureStore } from '@reduxjs/toolkit';
import TaskReducer from '../features/tasks/taskSlice'

export const store = configureStore({
  reducer: {
    tasks: TaskReducer,
  },
});
