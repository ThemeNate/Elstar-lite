import { forwardRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Container = forwardRef((props, ref) => {

	const { 
		className, 
		children, 
		asElement: Component,
		...rest 
	} = props


	return (
		<Component
			ref={ref}
			className={
				classNames(
					'container mx-auto', 
					className
				)
			} 
			{...rest}
		>
			{children}
		</Component>
	)
})

Container.defaultProps = {
	asElement: 'div'
}

Container.propTypes = {
	asElement: PropTypes.string
}

export default Container
