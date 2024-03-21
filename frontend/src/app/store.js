import { configureStore } from '@reduxjs/toolkit';
import TaskReducer from '../features/tasks/taskSlice'
import UserReducer from '../features/users/userSlice'

export const store = configureStore({
  reducer: {
    tasks: TaskReducer,
    user: UserReducer,
  },
});
