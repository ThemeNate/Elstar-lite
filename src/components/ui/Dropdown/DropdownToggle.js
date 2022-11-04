import React from 'react'
import classNames from 'classnames'
import { HiChevronDown, HiChevronUp, HiChevronRight, HiChevronLeft } from 'react-icons/hi'

const DropdownToggleDefaultContent = ({placement, children}) => {
	// TODO: impl rtl handling
	if(placement && placement.includes('middle-start')) {
		return (
			<>
				{children}
				<HiChevronRight />
			</>
		)
	}

	if(placement && placement.includes('middle-end')) {
		return (
			<>
				<HiChevronLeft />
				{children}
			</>
		)
	}

	if(placement && placement.includes('top')) {
		return (
			<>
				{children}
				<HiChevronUp />
			</>
		)
	}

	return (
		<>
			{children}
			<HiChevronDown />
		</>
	)
}


const DropdownToggle = React.forwardRef((props, ref) => {

	const {
		className,
		renderTitle,
		children,
		placement,
		inSidenav,
		disabled,
		toggleClassName,
		...rest
	} = props

	const toggleClass = 'dropdown-toggle'
	const disabledClass = 'dropdown-toggle-disabled'

	const dropdownToggleClass = classNames(
		toggleClass,
		className,
		toggleClassName,
		disabled && disabledClass
	)

	const dropdownToggleDefaultClass = classNames(
		dropdownToggleClass,
		'dropdown-toggle-default'
	)

	if (renderTitle) {
		return (
			<div className={dropdownToggleClass} {...rest} ref={ref}>
				{renderTitle}
			</div>
		)
	}

	return (
		<div ref={ref} className={dropdownToggleDefaultClass} {...rest}>
			<span className="flex items-center">
				<DropdownToggleDefaultContent placement={placement}>
					{children}
				</ DropdownToggleDefaultContent>
			</span>
		</div>
  	)
})

export default DropdownToggle
