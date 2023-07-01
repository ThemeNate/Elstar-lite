import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit'
import type { RootState } from './rootReducer'

/* eslint-disable @typescript-eslint/no-explicit-any */
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>
export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
