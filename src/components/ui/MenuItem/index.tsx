import { forwardRef } from 'react'
import classNames from 'classnames'
import type { CommonProps, TypeAttributes } from '../@types/common'
import type { ElementType } from 'react'

export interface MenuItemProps extends CommonProps {
    asElement?: ElementType
    id?: string
    disabled?: boolean
    eventKey?: string
    isActive?: boolean
    menuItemHeight?: string | number
    onSelect?: (eventKey: string, e: MouseEvent) => void
    variant?: TypeAttributes.MenuVariant
}

const MenuItem = forwardRef<HTMLElement, MenuItemProps>((props, ref) => {
    const {
        asElement: Component = 'div',
        children,
        className,
        disabled,
        eventKey,
        isActive,
        menuItemHeight = 35,
        onSelect,
        style,
        variant = 'light',
        ...rest
    } = props

    const menuItemActiveClass = `menu-item-active`
    const menuItemHoverClass = `menu-item-hoverable`
    const disabledClass = 'menu-item-disabled'
    const menuItemClass = classNames(
        'menu-item',
        `menu-item-${variant}`,
        isActive && menuItemActiveClass,
        disabled && disabledClass,
        !disabled && menuItemHoverClass,
        className
    )

    const hanldeOnClick = (e: MouseEvent) => {
        if (onSelect) {
            onSelect(eventKey as string, e)
        }
    }

    return (
        <Component
            ref={ref}
            className={menuItemClass}
            style={{ height: `${menuItemHeight}px`, ...style }}
            onClick={hanldeOnClick}
            {...rest}
        >
            {children}
        </Component>
    )
})

MenuItem.displayName = 'BaseMenuItem'

export default MenuItem
