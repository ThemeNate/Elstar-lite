import { combineReducers } from '@reduxjs/toolkit'
import common, { CommonState } from './commonSlice'

const reducer = combineReducers({
    common,
})

export type BaseState = {
    common: CommonState
}

export * from './commonSlice'

export default reducer
