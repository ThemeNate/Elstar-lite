import React, { useContext, useCallback, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import isNil from 'lodash/isNil'
import chainedFunction from '../utils/chainedFunction'
import DropdownContext from './context/dropdownContext' 
import MenuContext from './context/menuContext'
import useUncertainRef from '../hooks/useUncertainRef'
import useUniqueId from '../hooks/useUniqueId'
import { useConfig } from '../ConfigProvider'
import DropdownMenuContext, { useDropdownMenuContext, DropdownMenuContextProvider } from './context/dropdownMenuContext'
import classNames from 'classnames'
import { HiChevronRight } from 'react-icons/hi'
import MenuItem from '../MenuItem'
import { DROPDOWN_ITEM_TYPE } from '../utils/constant'

const  { DEFAULT, DIVIDER, HEADER, CUSTOM } = DROPDOWN_ITEM_TYPE

const DropdownItem = React.forwardRef((props, ref) => {

	const {
		asElement: Component,
		children,
		active: activeProp,
		disabled,
		className,
		submenu,
		style,
		eventKey,
		onClick,
		onSelect,
		variant,
		...rest
	} = props

	const { mode } = useConfig()

	const menuitemRef = useUncertainRef(ref)
    const menuitemId = useUniqueId('menu-item-')
    const submenuRef = useRef()

	const dropdown = useContext(DropdownContext)
    const menu = useContext(MenuContext)
    const menuControl = useContext(DropdownMenuContext)
    const submenuControl = useDropdownMenuContext(submenuRef)

    const open = submenuControl.open

	const active = activeProp || (!isNil(menu?.activeKey) && menu.activeKey === eventKey) || (!isNil(dropdown.activeKey) && dropdown.activeKey === eventKey)

	const openSubmenuIfExists = useCallback(() => {
		if (!submenu) {
			return
		}
		submenuControl.openMenu()
		submenuControl.focusItemAt(0)
	}, [submenu, submenuControl])

	const activate = useCallback((e) => {
		onSelect?.(eventKey, e)
		menu?.onSelect?.(eventKey, e)
	}, [eventKey, onSelect, menu])

	const handleClick = useCallback((e) => {
		if (disabled) {
			return
		}

		if (submenu) {
			openSubmenuIfExists()
		} else {
			activate(e)
		}
	}, [disabled, submenu, openSubmenuIfExists, activate])

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

	const menuitemEventHandlers = {
		onClick: chainedFunction(handleClick, onClick)
	}

	if (submenu) {
		menuitemEventHandlers.onMouseOver = handleMouseOver
		menuitemEventHandlers.onMouseOut = handleMouseOut
	}

	const { registerItem, unregisterItem } = menuControl ?? {}

	useEffect(() => {
		if (variant !== DIVIDER && variant !== HEADER) {
			registerItem?.(menuitemRef.current, { disabled })
		}
		return () => {
			unregisterItem?.(menuitemId)
		}
	}, [registerItem, unregisterItem, menuitemRef, menuitemId, disabled, variant])

	if ((variant === DIVIDER) || (variant === HEADER) || (variant === CUSTOM)) {
		return (
			<Component
				ref={menuitemRef}
				id={menuitemId}
				style={style}
				className={
					classNames(
						`menu-item-${variant}`,
						className
					)
				}
				{...(variant === CUSTOM ? (menuitemEventHandlers) : {})}
				{...rest}
			>
				{((variant === HEADER) || (variant === CUSTOM)) && children}
			</Component>
		)
	}

	function renderChildren() {
		if (!React.isValidElement(children)) {
			return children
		}
		return React.cloneElement(children)
	}

	function renderSubmenu() {
		if (!submenu) {
			return null
		}
  
		return (
			<DropdownMenuContextProvider value={submenuControl}>
				{React.cloneElement(submenu, {
					ref: submenuRef,
					hidden: !open
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
				{...(menuitemEventHandlers)}
			>
				<MenuItem
					asElement="div"
					ref={menuitemRef}
					id={menuitemId}
					isActive={active}
					eventKey={eventKey}
					variant={mode}
					className={classNames('dropdown-submenu-item', className)}
				>
					<span>{children}</span>
					<HiChevronRight />
				</MenuItem>
				{renderSubmenu()}
			</li>
		)
	}

	return (
		<MenuItem
			asElement="li"
			ref={menuitemRef}
			style={style}
			isActive={active}
			disabled={disabled}
			eventKey={eventKey}
			variant={mode}
			className={className}
			{...(menuitemEventHandlers)}
			{...rest}
      	>
			{renderChildren()}
			{renderSubmenu()}
      	</MenuItem>
	)
})

DropdownItem.defaultProps = {
	asElement: 'li',
	variant: DEFAULT
}

DropdownItem.propTypes = {
	active:  PropTypes.bool,
	disabled: PropTypes.bool,
	variant: PropTypes.oneOf([DEFAULT, DIVIDER, HEADER, CUSTOM]),
	eventKey: PropTypes.string,
	onClick: PropTypes.func,
	onSelect: PropTypes.func,
}

export default DropdownItem
