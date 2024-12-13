import { configureStore } from '@reduxjs/toolkit'

export const ReduxStore = configureStore({
  reducer: {},
})

export type RootState = ReturnType<typeof ReduxStore.getState>
export type AppDispatch = typeof ReduxStore.dispatch