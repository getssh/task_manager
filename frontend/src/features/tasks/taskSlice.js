import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import taskHelper from "./taskHelper";

const initialState = {
  tasks: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
}

export const getTasks = createAsyncThunk('tasks/get', (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().user.user.token

    return taskHelper.getTasks(token)
  } catch (error) {
    thunkAPI.rejectWithValue(error.toString())
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
      state.tasks = state.tasks.filter((task)=>{
        return task.favorite === true
      })
    }
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
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const {reset, favTasks} = taskSlice.actions
export default taskSlice.reducer
