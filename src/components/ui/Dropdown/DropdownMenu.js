import React, { useCallback, useContext } from 'react'
import Menu from './Menu'
import MenuContext from './context/menuContext'
import DropdownItem from './DropdownItem'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const DropdownMenu = React.forwardRef(( props, ref ) => {

	const { onToggle, eventKey, title, className, placement, ...rest } = props

	const parentMenu = useContext(MenuContext)

	const handleToggleSubmenu = useCallback((_, e) => {
		onToggle?.(eventKey, e)
	}, [eventKey, onToggle])

	const dropdownMenuDefaultClass = `dropdown-menu`
	const dropdownMenuPositionClass = placement

	const dropdownMenuClass = classNames(
		dropdownMenuDefaultClass,
		dropdownMenuPositionClass,
		className
	)
	
	const dropdownSubmenuClass = classNames(
		dropdownMenuDefaultClass,
		'dropdown-submenu',
	)

	const dropdownSubmenu = (
		<Menu 
			className={dropdownSubmenuClass}
			ref={ref}
			onToggle={handleToggleSubmenu}
			placement={placement}
			{...rest} 
		/>
	)

	if (parentMenu) {
		const { icon, trigger } = props
		const itemClassName = classNames(className)
  
		return (
			<DropdownItem
				icon={icon}
				trigger={trigger}
				className={itemClassName}
				submenu={dropdownSubmenu}
				eventKey={eventKey}
			>
				{title}
			</DropdownItem>
		)
	}

	return (
		<Menu
			className={dropdownMenuClass} 
			placement={placement} 
			ref={ref} 
			{...rest} 
		/>
	)
})

DropdownMenu.propTypes = {
	title: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node
	]),
	eventKey: PropTypes.string
}

export default DropdownMenu
