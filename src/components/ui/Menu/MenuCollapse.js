import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { CollapseContextProvider } from './context/collapseContext'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import MenuContext from './context/menuContext'
import { HiChevronDown } from 'react-icons/hi'

const MenuCollapse = props => {

	const { 
		children, 
		className,
		eventKey,
		expanded,
		label,
		onToggle,  
	} = props

	const [ isExpanded, setIsExpanded ] = useState(expanded)

	const { menuItemHeight, variant, sideCollapsed, defaultExpandedKeys } = useContext(MenuContext)

	useEffect(() => {
		if(defaultExpandedKeys.includes(eventKey)) {
			setIsExpanded(true)
		}
		if (expanded !== isExpanded) {
			setIsExpanded(true)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [expanded, onToggle, eventKey, defaultExpandedKeys])

	const toggleCollapse = e => {
        if (typeof onToggle === 'function') {
            onToggle(!isExpanded, e)
        }
		setIsExpanded(!isExpanded)
    }

	const getChildrenHeight = () => {
		let height = 0
		if (isExpanded && children && children.length) {
			height = children.length * menuItemHeight
		}
		if (isExpanded && children && !children.length) {
			height = menuItemHeight
		}
		return height
	}
	
	const menuCollapseItemClass = classNames(
		'menu-collapse-item',
		`menu-collapse-item-${variant}`,
		className,
	)

	return (
		<div className="menu-collapse" >
			<div className={menuCollapseItemClass} onClick={toggleCollapse}>
				<span className="flex items-center">{label}</span>
				<motion.span 
					className="text-lg mt-1"
					initial={{ transform: 'rotate(0deg)' }} 
					animate={{ 
						transform: isExpanded ? 'rotate(-180deg)' : 'rotate(0deg)',
					}}
					transition={{ duration: 0.15 }}
				>
					{sideCollapsed ? null : <HiChevronDown /> }
				</motion.span>
			</div>
			<CollapseContextProvider value={isExpanded}>
				<motion.ul
					className="ml-5"
					initial={{ opacity: 0, height: 0, overflow: 'hidden' }} 
					animate={{ 
						opacity: isExpanded ? 1 : 0,
						height: isExpanded ? getChildrenHeight() : 0,
					}}
					transition={{ duration: 0.15 }}
				> 
					{children}
				</motion.ul>
			</CollapseContextProvider>
		</div>
	)
}

MenuCollapse.propTypes = {
	expanded: PropTypes.bool,
	onToggle: PropTypes.func,
	label: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node
	]),
	children: PropTypes.node,
	className: PropTypes.string
}

MenuCollapse.defaultProps = {
	expanded: false,
	label: null
}

export default MenuCollapse
