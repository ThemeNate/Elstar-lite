import React from 'react'
import classNames from 'classnames'

const withHeaderItem = Component => props => {

	const { className, hoverable = true } = props

	return (
		<Component 
			{...props} 
			className={
				classNames(
					'header-action-item',
					hoverable && 'header-action-item-hoverable',
					className
				)}  
		/>
	)
}

export default withHeaderItem
