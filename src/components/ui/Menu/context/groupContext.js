import { createContext } from 'react'

const GroupContext = createContext()

export const GroupContextProvider = GroupContext.Provider

export const GroupContextConsumer = GroupContext.Consumer

export default GroupContext;