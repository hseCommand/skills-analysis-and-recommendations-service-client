import { combineReducers, configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'

import skillSlice from './slice/skillSlice'

const rootReducer = combineReducers({
  skills: skillSlice,
})

const middlewares = [logger]

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (gDM) => gDM().concat(middlewares),
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
