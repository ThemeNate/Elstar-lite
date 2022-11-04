import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useConfig } from '../ConfigProvider'
import { useForm } from '../Form/context'
import { useInputGroup } from '../InputGroup/context'
import { CONTROL_SIZES, SIZES } from '../utils/constant'

const Addon = React.forwardRef((props, ref) => {

	const { size, children, className } = props

	const { controlSize } = useConfig()
	const formControlSize = useForm()?.size
	const inputGroupSize = useInputGroup()?.size

	const inputAddonSize = size || inputGroupSize ||  formControlSize || controlSize 

	const addonClass = classNames(
		'input-addon',
		`input-addon-${inputAddonSize} h-${CONTROL_SIZES[inputAddonSize]}`,
		className
	)

	return (
		<div ref={ref} className={addonClass}>
			{children}
		</div>
	)
})

Addon.propTypes = {
	size: PropTypes.oneOf([SIZES.LG, SIZES.SM, SIZES.MD]),
}

export default Addon
