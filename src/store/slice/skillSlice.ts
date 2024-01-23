import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ServiceRecommendationApi from '../../api/ServiceRecommendationApi'
import { Skill } from '../../types/Skill'

export const fetchAllSkills = createAsyncThunk(
  'skills/fetchAll',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (_, thunkApi) => {
    // try {
    const response = await ServiceRecommendationApi.getInstance().getAllSkills()
    return response.json()
    // } catch (e) {
    //   return thunkApi.rejectWithValue('service not working')
    // }
  },
)

interface SkillState {
  skills: Skill[]
  loading: boolean
  error: string
}

const initialState: SkillState = {
  skills: [],
  loading: false,
  error: null,
}

export const skillsSlice = createSlice({
  name: 'skills',
  initialState: initialState,
  reducers: {
    addSkill: (state, action: PayloadAction<Skill>) => {
      state.skills.push(action.payload)
    },
  },
  extraReducers: {
    [fetchAllSkills.fulfilled.type]: (
      state,
      action: PayloadAction<Skill[]>,
    ) => {
      state.loading = true
      state.skills = action.payload
    },
    [fetchAllSkills.pending.type]: (state) => {
      state.loading = false
    },
    [fetchAllSkills.rejected.type]: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload as string
    },
  },
})

export default skillsSlice.reducer
