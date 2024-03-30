import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import taskHelper from "./taskHelper";

const initialState = {
  tasks: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  filter: [],
  message: "",
}

export const getTasks = createAsyncThunk('tasks/get', (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().user.user.token

    return taskHelper.getTasks(token)
  } catch (error) {
    const message = 
    (error.response && error.response.data &&
      error.response.data.message) || error.message || error.toString()
    
    return thunkAPI.rejectWithValue(message)
  }
})

export const addTask = createAsyncThunk('tasks/create', async(taskData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().user.user.token
    return await taskHelper.addTask(taskData, token)
  } catch (error) {
    const message = 
    (error.response && error.response.data &&
      error.response.data.message) || error.message || error.toString()
    
    return thunkAPI.rejectWithValue(message)
  }
})

export const removeTask = createAsyncThunk('tasks/deleteTask', async (taskId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().user.user.token

    return await taskHelper.removeTask(taskId, token)
  } catch (error) {
    const message = 
    (error.response && error.response.data &&
      error.response.data.message) || error.message || error.toString()
    
    return thunkAPI.rejectWithValue(message)
  }
})

export const updatedTask = createAsyncThunk('tasks/updateTask', async ({taskId, taskData}, thunkAPI) => {
  try {
    const token = thunkAPI.getState().user.user.token

    return await taskHelper.updatedTask(taskId, taskData, token)
  } catch (error) {
    const message = 
    (error.response && error.response.data &&
      error.response.data.message) || error.message || error.toString()
    
    return thunkAPI.rejectWithValue(message)
  }
})

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    reset: (state) => {
      state = initialState
    },
    favTasks: (state) => {
      if (state.tasks) {
        return {
          ...state,
          tasks: state.tasks.filter((task) => task.favorite === true),
        };
      } else {
        return state;
      }
    },
    filterTask: (state, action) => {
      const control = [...state.filter];
      state.tasks = control

      
      const filteredtask = state.tasks
      .filter((task) => {
          const filterComplete = action.payload.isComplete ? task.taskCompleted === action.payload.isComplete :
          task
          const filterFavorite = action.payload.isFavorite ? task.favorite === action.payload.isFavorite :
          task

          const filterPriority = ['low', 'high', 'urgent'].includes(action.payload.priorityFilter) ? 
            task.priority === action.payload.priorityFilter : task

          const today = new Date().toISOString().split('T')[0]
          const taskCreated = task.createdAt.split('T')[0]
          const filterByDate = action.payload.isToday ? taskCreated === today : task

          return filterComplete && filterFavorite && filterPriority && filterByDate &&
          task.taskItem.toLowerCase().includes(action.payload.taskText.toLowerCase())
        })

      state.tasks = filteredtask;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.tasks = action.payload
        state.filter = action.payload
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(addTask.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.tasks.push(action.payload)
        state.filter.push(action.payload)
      })
      .addCase(addTask.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(removeTask.pending, (state) => {
        state.isLoading = false
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.tasks = state.tasks.filter((task) => {
          return task._id !== action.payload.id
        })
        state.filter = state.filter.filter((task) => {
          return task._id !== action.payload.id
        })
      })
      .addCase(removeTask.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updatedTask.pending, (state) => {
        state.isLoading = false
      })
      .addCase(updatedTask.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        const updatedTaskIndex = state.tasks.findIndex(task => task._id === action.payload._id);
        const updatedFilterIndex = state.filter.findIndex(task => task._id === action.payload._id);
        if (updatedTaskIndex !== -1) {
          state.tasks[updatedTaskIndex] = action.payload;
        }
        if (updatedFilterIndex !== -1) {
          state.filter[updatedFilterIndex] = action.payload;
        }
      })
      .addCase(updatedTask.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const {reset, favTasks, filterTask} = taskSlice.actions
export default taskSlice.reducer