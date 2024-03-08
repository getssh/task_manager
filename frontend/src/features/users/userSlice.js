import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
}

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

  }
})

export const {reset} = userSlice.actions
export default userSlice.reducer