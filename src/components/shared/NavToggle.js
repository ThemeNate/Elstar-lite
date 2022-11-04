import React from 'react'
import { HiOutlineMenuAlt2, HiOutlineMenu } from 'react-icons/hi'

const NavToggle = ({toggled, className}) => {
	return (
		<div className={className}>
			{toggled ? <HiOutlineMenu /> : <HiOutlineMenuAlt2 />}
		</div>
	)
}

export default NavToggle