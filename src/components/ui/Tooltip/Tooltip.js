import React, { useState, useCallback, useRef, useEffect }  from 'react'
import classNames from 'classnames'
import { Popper, Reference, Manager } from 'react-popper'
import { motion, AnimatePresence } from 'framer-motion'
import Arrow from './Arrow'
import PropTypes from 'prop-types'
import { Portal } from 'react-portal'

const PopperElement = props => {
	const {title, forceUpdate, open } = props
	useEffect(() => {
		if (open) {
			forceUpdate()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [open])
	return (
		<span>{title}</span>
	)
}

const Tooltip = props => {

	const { className, children, title, placement, wrapperClass, isOpen, ...rest } = props

	const [tooltipOpen, setTooltipOpen] = useState(isOpen)
	const tooltipNode = useRef()

	const tooltipBackground = 'gray-800'
	const tooltipDarkBackground = 'black'

	const defaultTooltipClass = `tooltip bg-${tooltipBackground} dark:bg-${tooltipDarkBackground}`

	const toggleTooltip = useCallback((bool) => {
		if(!isOpen) {
			setTooltipOpen(bool)
		}
	}, [isOpen])

	return (
		<Manager>
			<Reference>
				{({ ref }) => (
					<span
						className={classNames('tooltip-wrapper', wrapperClass)}
						ref={ref}
						onMouseEnter={() => toggleTooltip(true)}
						onMouseLeave={() => toggleTooltip(false)}
					>
						{children}
					</span>
				)}
			</Reference>
			{tooltipOpen && (
				<Portal>
					<Popper 
						placement={placement} 
						innerRef={(node) => (tooltipNode.current = node)}
						modifiers={[
							{ name: 'arrow', options: { element: Arrow }},
							{ name: 'offset', options: { offset: [ 0, 7 ] }}
						]}
						strategy={'fixed'}
					>
						{({ ref, style, ...popperProps }) =>
							<AnimatePresence>
								<motion.div 
									className={defaultTooltipClass} 
									ref={ref} 
									style={style}
									initial={{ opacity: 0, visibility: 'hidden' }}
									animate={tooltipOpen ? {opacity: 1, visibility: 'visible'} : {opacity: 0, visibility: 'hidden'}}
									transition={{ duration: 0.15, type: 'tween' }}
								>
									<PopperElement open={tooltipOpen} title={title} { ...rest } {...popperProps}/>
									<Arrow 
										placement={placement} 
										color={tooltipBackground}
										colorDark={tooltipDarkBackground}
									/>
								</motion.div>
							</AnimatePresence>
						}
					</Popper>
				</Portal>
			)}
			
		</Manager>
	)
}

Tooltip.propTypes = {
	title: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node
	]),
	placement: PropTypes.oneOf([
		'top',
		'top-start',
		'top-end',
		'bottom',
		'bottom-start',
		'bottom-end',
		'right',
		'right-start',
		'right-end',
		'left',
		'left-start',
		'left-end'
	]),
	wrapperClass: PropTypes.string,
	isOpen: PropTypes.bool
}

Tooltip.defaultProps = {
	placement: 'top',
	isOpen: false
}

export default Tooltip
