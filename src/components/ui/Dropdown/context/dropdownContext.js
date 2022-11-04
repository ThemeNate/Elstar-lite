import { createContext } from 'react'

const DropdownContext = createContext()

export const DropdownContextProvider = DropdownContext.Provider

export const DropdownContextConsumer = DropdownContext.Consumer

export default DropdownContext