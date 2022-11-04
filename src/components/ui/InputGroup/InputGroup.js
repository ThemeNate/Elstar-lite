import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useConfig } from '../ConfigProvider'
import { useForm } from '../Form/context'
import { InputGroupContextProvider, InputGroupContextConsumer } from './context'
import { SIZES } from '../utils/constant'

const InputGroup = React.forwardRef((props, ref) => {

	const { children, className, size } = props

	const { controlSize } = useConfig()
	const formControlSize = useForm()?.size

	const inputGroupSize = size || formControlSize || controlSize

	const inputGroupClass = classNames(
		'input-group',
		className
	)

	const contextValue = {
		size : inputGroupSize
	}
	return (
		<InputGroupContextProvider value={contextValue}>
			<InputGroupContextConsumer>
				{
					() => {
						return (
							<div ref={ref} className={inputGroupClass}>
								{children}
							</div>
						)
					}
				}
			</InputGroupContextConsumer>
		</InputGroupContextProvider>
	)
})

InputGroup.propTypes = {
	size: PropTypes.oneOf([SIZES.LG, SIZES.SM, SIZES.MD]),
}

export default InputGroup