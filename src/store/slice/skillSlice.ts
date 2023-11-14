import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ServiceRecommendationApi from '../../api/ServiceRecommendationApi'

export const fetchAllSkills = createAsyncThunk('skills/fetchAll', async () => {
  const response = await ServiceRecommendationApi.getInstance().getAllSkills()
  return response.json()
})

const skillsSlice = createSlice({
  name: 'skills',
  initialState: {
    skills: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSkills.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchAllSkills.fulfilled, (state, action) => {
        state.loading = false
        state.skills = action.payload
      })
      .addCase(fetchAllSkills.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export default skillsSlice.reducer
