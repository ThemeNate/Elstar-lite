import React from 'react'
import navigationIcon from 'configs/navigation-icon.config'

export const Icon = ({component: Component}) => {
	return <><Component /></>
}

const VerticalMenuIcon = ({icon, gutter}) => {

	if(typeof icon !== 'string' && !icon) {
		return <></>
	}

	return (
		<span className={`text-2xl ${gutter ? 'ltr:mr-2 rtl:ml-2' : ''}`}>
			{navigationIcon[icon]}
		</span>
	)
}

VerticalMenuIcon.defaultProps = {
	gutter: true
}

export default VerticalMenuIcon