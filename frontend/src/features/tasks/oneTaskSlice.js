import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import taskHelper from "./taskHelper";

const initialState = {
  task: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
}

export const getTask = createAsyncThunk('task/getTask', async(taskId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().user.user.token
    
    return await taskHelper.getTask(taskId, token)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

const oneTaskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getTask.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTask.fulfilled, (state, actions) => {
        state.isLoading = false
        state.isSuccess = true
        state.task = actions.payload
      })
      .addCase(getTask.rejected, (state, actions) => {
        state.isLoading = false
        state.isError = true
        state.message = actions.payload
      })
  }
})

export const {} = oneTaskSlice.actions

export default oneTaskSlice.reducer

