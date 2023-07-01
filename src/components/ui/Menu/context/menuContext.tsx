import { createContext } from 'react'
import type { TypeAttributes } from '../../@types/common'

export interface MenuContextProps {
    defaultActiveKeys?: Array<string>
    defaultExpandedKeys?: Array<string>
    menuItemHeight?: number
    onSelect?: (eventKey: string, e: MouseEvent) => void
    sideCollapsed?: boolean
    variant?: TypeAttributes.MenuVariant
}

const MenuContext = createContext<MenuContextProps>({})

export const MenuContextProvider = MenuContext.Provider

export const MenuContextConsumer = MenuContext.Consumer

export default MenuContext
