import React, { useRef, useCallback } from 'react'
import DropdownMenu from './DropdownMenu'
import DropdownToggle from './DropdownToggle'
import PropTypes from 'prop-types'
import useUniqueId from '../hooks/useUniqueId'
import DropdownContext from './context/dropdownContext'
import DropdownMenuContext, { useDropdownMenuContext } from './context/dropdownMenuContext'
import chainedFunction from '../utils/chainedFunction'
import useRootClose from '../hooks/useRootClose'
import arrayIndexOf from '../utils/arrayIndexOf'
import { PLACEMENT } from '../utils/constant'

const CLICK = 'click'
const HOVER = 'hover'
const CONTEXT = 'context'

const Dropdown = React.forwardRef((props, ref) => {

	const {
		title,
		children,
		className,
		menuClass,
		menuStyle,
		disabled,
		renderTitle,
		placement,
		activeKey,
		toggleClassName,
		trigger,
		style,
		onClick,
		onMouseEnter,
		onMouseLeave,
		onContextMenu,
		onSelect,
		onOpen,
		onClose,
		onToggle,
		...rest
	} = props

	const overlayTarget = useRef()
  	const triggerTarget = useRef()
	const menuControl = useDropdownMenuContext(overlayTarget)
	const open = menuControl.open

	const buttonId = useUniqueId('dropdown-toggle-')
  	const menuId = useUniqueId('base-menu-')

	const handleToggle = useCallback((isOpen) => {

		const nextOpen = typeof isOpen === 'undefined' ? !open : isOpen
		const fn = nextOpen ? onOpen : onClose
	
		fn?.()
		onToggle?.(nextOpen)
		if (nextOpen) {
			menuControl.openMenu()
		} else {
			menuControl.closeMenu()
		}
	}, [onClose, onOpen, onToggle, open, menuControl])

	const handleClick = useCallback(e => {
		e.preventDefault()
		if (disabled) {
			return
		}
		handleToggle()
	}, [disabled, handleToggle])

	const handleMouseEnter = useCallback(() => {
		if (!disabled) {
			handleToggle(true)
		}
	}, [disabled, handleToggle])

	const handleMouseLeave = useCallback(() => {
		if (!disabled) {
			handleToggle(false)
		}
	}, [disabled, handleToggle])
	
	const handleSelect = (eventKey, e) => {
		onSelect?.(eventKey, e)
		handleToggle(false)
	}

	useRootClose(() => handleToggle(), {
		triggerTarget,
		overlayTarget,
		disabled: !open,
		listenEscape: false
	})

	const dropdownProps = {
		onMouseEnter,
		onMouseLeave
	}

	const toggleEventHandlers = {
		onClick: onClick,
		onContextMenu,
	}

	if (arrayIndexOf(CLICK, trigger)) {
		toggleEventHandlers.onClick = chainedFunction(handleClick, toggleEventHandlers.onClick)
	}
	
	if (arrayIndexOf(CONTEXT, trigger)) {
		toggleEventHandlers.onContextMenu = chainedFunction(handleClick, onContextMenu)
	}
	
	if (arrayIndexOf(HOVER, trigger)) {
		dropdownProps.onMouseEnter = chainedFunction(handleMouseEnter, onMouseEnter)
		dropdownProps.onMouseLeave = chainedFunction(handleMouseLeave, onMouseLeave)
	}

	const toggleElement = (
		<DropdownToggle
			{...rest}
			{...toggleEventHandlers}
			id={buttonId}
			ref={triggerTarget}
			className={toggleClassName}
			renderTitle={renderTitle}
			disabled={disabled}
			placement={placement}
		>
			{title}
		</DropdownToggle>
	)

	const menuElement = (
		<DropdownMenu
			className={menuClass}
			style={menuStyle}
			onSelect={handleSelect}
			activeKey={activeKey}
			ref={overlayTarget}
			hidden={!open}
			placement={placement}
			id={menuId}
		>
			{children}
		</DropdownMenu>
	)

	return (
		<DropdownContext.Provider value={{ activeKey }}>
			<div
				{...dropdownProps}
				ref={ref}
				style={style}
				className="dropdown"
			>
				{toggleElement}
				<DropdownMenuContext.Provider value={menuControl}>
					{menuElement}
				</DropdownMenuContext.Provider>
			</div>
		</DropdownContext.Provider>
	)
})

const { 
	TOP_START, 
	TOP_CENTER, 
	TOP_END, BOTTOM_START, 
	BOTTOM_CENTER, 
	BOTTOM_END,
	MIDDLE_START_TOP,
	MIDDLE_START_BOTTOM,
	MIDDLE_END_TOP,
	MIDDLE_END_BOTTOM
} = PLACEMENT

Dropdown.propTypes = {
	trigger: PropTypes.oneOf([CLICK, HOVER, CONTEXT]),
	placement: PropTypes.oneOf([
		TOP_START, 
		TOP_CENTER, 
		TOP_END, BOTTOM_START, 
		BOTTOM_CENTER, 
		BOTTOM_END,
		MIDDLE_START_TOP,
		MIDDLE_START_BOTTOM,
		MIDDLE_END_TOP,
		MIDDLE_END_BOTTOM
	]),
	menuClass: PropTypes.string,
	menuStyle: PropTypes.object,
	disabled: PropTypes.bool,
	title: PropTypes.string,
	renderTitle: PropTypes.node,
	activeKey: PropTypes.string,
	toggleClassName: PropTypes.string,
	onClick: PropTypes.func,
	onMouseEnter: PropTypes.func,
	onMouseLeave: PropTypes.func,
	onContextMenu: PropTypes.func,
	onSelect: PropTypes.func,
	onOpen: PropTypes.func,
	onClose: PropTypes.func,
	onToggle: PropTypes.func,
}


Dropdown.defaultProps = {
	placement: BOTTOM_START,
	trigger: 'click',
}

export default Dropdown
