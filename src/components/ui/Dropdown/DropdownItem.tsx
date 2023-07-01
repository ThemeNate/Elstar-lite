import {
    useContext,
    useCallback,
    useEffect,
    useRef,
    forwardRef,
    isValidElement,
    cloneElement,
} from 'react'
import isNil from 'lodash/isNil'
import chainedFunction from '../utils/chainedFunction'
import DropdownContext from './context/dropdownContext'
import MenuContext from './context/menuContext'
import useUncertainRef from '../hooks/useUncertainRef'
import useUniqueId from '../hooks/useUniqueId'
import { useConfig } from '../ConfigProvider'
import DropdownMenuContext, {
    useDropdownMenuContext,
    DropdownMenuContextProvider,
} from './context/dropdownMenuContext'
import classNames from 'classnames'
import { HiChevronRight, HiChevronLeft } from 'react-icons/hi'
import MenuItem from '../MenuItem'
import { DROPDOWN_ITEM_TYPE } from '../utils/constants'
import type { CommonProps } from '../@types/common'
import type {
    SyntheticEvent,
    RefObject,
    ElementType,
    ReactElement,
} from 'react'

export interface DropdownItemProps extends CommonProps {
    asElement?: ElementType
    active?: boolean
    disabled?: boolean
    submenu?: ReactElement
    eventKey?: string
    onClick?: () => void
    onSelect?: (eventKey: string, e: SyntheticEvent) => void
    variant?: 'default' | 'header' | 'divider' | 'custom'
}

const { DEFAULT, DIVIDER, HEADER, CUSTOM } = DROPDOWN_ITEM_TYPE

const DropdownItem = forwardRef<HTMLElement, DropdownItemProps>(
    (props, ref) => {
        const {
            asElement: Component = 'li',
            children,
            active: activeProp,
            disabled,
            className,
            submenu,
            style,
            eventKey,
            onClick,
            onSelect,
            variant = DEFAULT,
            ...rest
        } = props

        const { mode, direction } = useConfig()

        const menuitemRef = useUncertainRef<HTMLElement>(
            ref
        ) as RefObject<HTMLElement>
        const menuitemId = useUniqueId('menu-item-')
        const submenuRef = useRef(null)

        const dropdown = useContext(DropdownContext)
        const menu = useContext(MenuContext)
        const menuControl = useContext(DropdownMenuContext)
        const submenuControl = useDropdownMenuContext(submenuRef)

        const open = submenuControl.open

        const active =
            activeProp ||
            (!isNil(menu?.activeKey) && menu?.activeKey === eventKey) ||
            (!isNil(dropdown?.activeKey) && dropdown?.activeKey === eventKey)

        const openSubmenuIfExists = useCallback(() => {
            if (!submenu) {
                return
            }
            submenuControl.openMenu()
            submenuControl.focusItemAt(0)
        }, [submenu, submenuControl])

        const activate = useCallback(
            (e: SyntheticEvent) => {
                onSelect?.(eventKey as string, e)
                menu?.onSelect?.(eventKey as string, e)
            },
            [eventKey, onSelect, menu]
        )

        const handleClick = useCallback(
            (e: SyntheticEvent) => {
                if (disabled) {
                    return
                }

                if (submenu) {
                    openSubmenuIfExists()
                } else {
                    activate(e)
                }
            },
            [disabled, submenu, openSubmenuIfExists, activate]
        )

        const handleMouseOver = useCallback(() => {
            if (submenu) {
                submenuControl.openMenu()
            }
        }, [submenu, submenuControl])

        const handleMouseOut = useCallback(() => {
            if (submenu) {
                submenuControl.closeMenu()
            }
        }, [submenu, submenuControl])

        const menuitemEventHandlers: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onClick: any
            onMouseOver?: () => void
            onMouseOut?: () => void
        } = {
            onClick: chainedFunction(handleClick, onClick),
        }

        const { registerItem, unregisterItem } = menuControl ?? {}

        if (submenu) {
            menuitemEventHandlers.onMouseOver = handleMouseOver
            menuitemEventHandlers.onMouseOut = handleMouseOut
        }

        useEffect(() => {
            if (variant !== DIVIDER && variant !== HEADER) {
                registerItem?.(menuitemRef.current, { disabled })
            }
            return () => {
                unregisterItem?.(menuitemId)
            }
        }, [
            registerItem,
            unregisterItem,
            menuitemRef,
            menuitemId,
            disabled,
            variant,
        ])

        if (variant === DIVIDER || variant === HEADER || variant === CUSTOM) {
            return (
                <Component
                    ref={menuitemRef}
                    id={menuitemId}
                    style={style}
                    className={classNames(`menu-item-${variant}`, className)}
                    {...(variant === CUSTOM ? menuitemEventHandlers : {})}
                    {...rest}
                >
                    {(variant === HEADER || variant === CUSTOM) && children}
                </Component>
            )
        }

        function renderChildren() {
            if (!isValidElement(children)) {
                return children
            }
            return cloneElement(children)
        }

        function renderSubmenu() {
            if (!submenu) {
                return null
            }

            return (
                <DropdownMenuContextProvider value={submenuControl}>
                    {cloneElement(submenu, {
                        ref: submenuRef,
                        hidden: !open,
                    })}
                </DropdownMenuContextProvider>
            )
        }

        if (submenu) {
            return (
                <li
                    {...rest}
                    style={style}
                    className="relative"
                    {...menuitemEventHandlers}
                >
                    <MenuItem
                        ref={menuitemRef}
                        asElement="div"
                        id={menuitemId}
                        isActive={active}
                        eventKey={eventKey}
                        variant={mode}
                        className={classNames(
                            'dropdown-submenu-item',
                            className
                        )}
                    >
                        <span>{children}</span>
                        {direction === 'rtl' ? (
                            <HiChevronLeft />
                        ) : (
                            <HiChevronRight />
                        )}
                    </MenuItem>
                    {renderSubmenu()}
                </li>
            )
        }

        return (
            <MenuItem
                ref={menuitemRef}
                asElement="li"
                style={style}
                isActive={active}
                disabled={disabled}
                eventKey={eventKey}
                variant={mode}
                className={className}
                {...menuitemEventHandlers}
                {...rest}
            >
                {renderChildren()}
                {renderSubmenu()}
            </MenuItem>
        )
    }
)

DropdownItem.displayName = 'DropdownItem'

export default DropdownItem
