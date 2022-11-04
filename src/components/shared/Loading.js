import React from 'react'
import { Spinner } from 'components/ui'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const DefaultLoading = props => {

	const { 
		loading,
		children, 
		spinnerClass, 
		className, 
		asElement: Component,
		customLoader,
	} = props

	return (
		loading ?
		<Component className={classNames(!customLoader &&'flex items-center justify-center h-full', className)}>
			{
				customLoader ?
				<>{customLoader}</>
				:
				<Spinner className={spinnerClass} size={40} />
			}
		</Component>
		:
		<>{children}</>
	)
}

const CoveredLoading = props => {

	const { 
		loading,
		children, 
		spinnerClass, 
		className, 
		asElement: Component,
		customLoader,
	} = props


	return (
		<Component className={classNames(loading ? 'relative' : '', className)}>
			{children}
			{loading && (
				<div className="w-full h-full bg-white dark:bg-gray-800 dark:bg-opacity-60 bg-opacity-50 absolute inset-0" />
			)}
			{loading && (
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10" >
					{
						customLoader ?
						<>{customLoader}</>
						:
						<Spinner className={spinnerClass} size={40} />
					}
				</div>
			)}
				
		</Component>
	)
}

const Loading = props => {

	switch (props.type) {
		case 'default':
			return <DefaultLoading {...props} />
		case 'cover':
			return <CoveredLoading {...props} />
		default:
			return <DefaultLoading {...props} />
	}
}

Loading.defaultProps = {
	loading: false,
	type: 'default',
	asElement: 'div',
}

Loading.propTypes = {
	loading: PropTypes.bool,
	spinnerClass: PropTypes.string,
	type: PropTypes.oneOf(['default', 'cover']),
	customLoader: PropTypes.node
}

export default Loading
