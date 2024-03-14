import { configureStore } from '@reduxjs/toolkit';
import TaskReducer from '../features/tasks/taskSlice'
import UserReducer from '../features/users/userSlice'
import OneTaskReducer from '../features/tasks/oneTaskSlice'

export const store = configureStore({
  reducer: {
    tasks: TaskReducer,
    task: OneTaskReducer,
    user: UserReducer,
  },
});
