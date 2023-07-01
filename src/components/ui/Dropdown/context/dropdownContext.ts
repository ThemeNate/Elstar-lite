import { createContext } from 'react'
import type { SyntheticEvent } from 'react'

export type DropdownContextProps = {
    activeKey?: string | null
    onSelect?: (eventKey: string, event: SyntheticEvent) => void
}

const DropdownContext = createContext<DropdownContextProps | null>(null)

export const DropdownContextProvider = DropdownContext.Provider

export const DropdownContextConsumer = DropdownContext.Consumer

export default DropdownContext
