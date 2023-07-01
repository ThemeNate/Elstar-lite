import { createContext } from 'react'

const CollapseContext = createContext<boolean>(false)

export const CollapseContextProvider = CollapseContext.Provider

export const CollapseContextConsumer = CollapseContext.Consumer

export default CollapseContext
