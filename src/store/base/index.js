import { combineReducers } from '@reduxjs/toolkit'
import common from './commonSlice'

const reducer = combineReducers({
    common,
})

export default reducer