import type { ForwardRefExoticComponent, RefAttributes } from 'react'
import _Dropdown, { DropdownProps } from './Dropdown'
import DropdownItem from './DropdownItem'
import DropdownMenu from './DropdownMenu'

export type { DropdownProps } from './Dropdown'
export type { DropdownItemProps } from './DropdownItem'
export type { DropdownMenuProps } from './DropdownMenu'

type CompoundedComponent = ForwardRefExoticComponent<
    DropdownProps & RefAttributes<HTMLDivElement>
> & {
    Item: typeof DropdownItem
    Menu: typeof DropdownMenu
}

const Dropdown = _Dropdown as CompoundedComponent

Dropdown.Item = DropdownItem
Dropdown.Menu = DropdownMenu

export { Dropdown }

export default Dropdown
