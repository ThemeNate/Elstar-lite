import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { GroupContextProvider } from './context/groupContext'
import MenuContext from './context/menuContext'
import useUniqueId from '../hooks/useUniqueId'

const MenuGroup = props => {

	const { label, children, className } = props

	const { variant, sideCollapsed } = useContext(MenuContext)

	const menuGroupDefaultClass = 'menu-group'
	const menuGroupClass = classNames(
		menuGroupDefaultClass,
		className
	)

	const entityHeaderId = useUniqueId('entity-header-')

	return (
		<div className={menuGroupClass}>
			{
				(label && !sideCollapsed) && (
					<div 
						className={classNames('menu-title', `menu-title-${variant}`)} 
						id={entityHeaderId}
					>
						{label}
					</div>
				)
			}
			<GroupContextProvider value>
				<ul>
					{children}
				</ul>
			</GroupContextProvider>
		</div>
	)
}

MenuGroup.propTypes = {
	label: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node
	]),
	children: PropTypes.node,
	className: PropTypes.string
}

MenuGroup.defaultProps = {
	label: null
}

export default MenuGroup
