import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userHelper from './userHelper'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
}

export const registerUser = createAsyncThunk('user/register', async(userData, thunkAPI) => {
  try {
    return await userHelper.registerUser(userData)
  } catch (error) {
    const message = 
    (error.response && error.response.data &&
      error.response.data.message) || error.message || error.toString()
    
    return thunkAPI.rejectWithValue(message)
  }
})

export const signinUser = createAsyncThunk('user/signin', async(userData, thunkAPI) => {
  try {
    return await userHelper.signinUser(userData)
  } catch (error) {
    const message = 
    (error.response && error.response.data &&
      error.response.data.message) || error.message || error.toString()
    
    return thunkAPI.rejectWithValue(message)
  }
})

export const deleteUser = createAsyncThunk('user/delete', async(_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().user.user.token

    return await userHelper.deleteUser(token)
  } catch (error) {
    const message = 
    (error.response && error.response.data &&
      error.response.data.message) || error.message || error.toString()
    
    return thunkAPI.rejectWithValue(message)
  }
})

export const logout = createAsyncThunk('user/logout/', async() => {
  return await userHelper.logout();
})

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ""
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerUser.fulfilled, (state, action)=> {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.user = null
        state.message = action.payload
      })
      .addCase(signinUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(signinUser.fulfilled, (state, action)=> {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.user = null
        state.message = action.payload
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteUser.fulfilled, (state)=> {
        state.isLoading = false
        state.isSuccess = true
        state.user = null
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.user = null
        state.message = action.payload
      })
      .addCase(logout.fulfilled, (state)=> {
        state.user = null
      })
  }
})

export const {reset} = userSlice.actions
export default userSlice.reducer