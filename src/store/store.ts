import { combineReducers, configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'

import skillSlice from './slice/skillSlice'

const rootReducer = combineReducers({
  skills: skillSlice,
})

const middlewares = [logger]

export const store = configureStore({
  reducer: rootReducer,
  middleware: (gDM) => gDM().concat(middlewares),
})
