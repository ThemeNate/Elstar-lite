import React, { useState, useEffect, useRef } from 'react'
import useMergedRef from '../hooks/useMergeRef'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Avatar = React.forwardRef((props, ref) => {

	const { 
		size, 
		src, 
		srcSet, 
		shape, 
		alt, 
		className, 
		icon,
		...rest 
	} = props

	let { children } = props
	const [scale, setScale] = useState(1)

	const avatarChildren = useRef()
	const avatarNode  = useRef()

	const avatarMergeRef = useMergedRef(ref, avatarNode)

	const innerScale = () => {
		if (!avatarChildren.current || !avatarNode.current) {
			return
		}
		const avatarChildrenWidth = avatarChildren.current.offsetWidth
		const avatarNodeWidth = avatarNode.current.offsetWidth
		if ( avatarChildrenWidth === 0 || avatarNodeWidth === 0 ) {
			return
		}
		setScale(avatarNodeWidth - 8 < avatarChildrenWidth ? (avatarNodeWidth - 8) / avatarChildrenWidth : 1)
	}

	useEffect(() => {
		innerScale()
	}, [scale, children])

	const sizeStyle = typeof size === 'number' ? {
		width: size,
		height: size,
		minWidth: size,
		lineHeight: `${size}px`,
		fontSize: icon ? size / 2 : 12,
	} : {}

	const classes = classNames(
		'avatar', 
		`avatar-${shape}`, 
		typeof size === 'string' ? `avatar-${size}` : '',
		className
	)

	if (src) {
		children = <img className={`avatar-img avatar-${shape}`} src={src} srcSet={srcSet} alt={alt} loading="lazy" />
	} else if (icon) {
		children = (
			<span className={classNames('avatar-icon', `avatar-icon-${size}`)}>{icon}</span>
		)
	} else {
		const childrenSizeStyle = typeof size === 'number' ? {lineHeight: `${size}px`} : {}
		const stringCentralized = { transform: `translateX(-50%) scale(${scale})` }
		children = (
			<span
				className={`avatar-string ${typeof size === 'number' ? '' : `avatar-inner-${size}`}`}
				style={{...childrenSizeStyle, ...stringCentralized, ...typeof size === 'number' ? {height: size} : {}}}
				ref={node => {
					avatarChildren.current = node
				}}
			>
				{children}
			</span>
		)
	}

	return (
		<span className={classes} style={{ ...sizeStyle, ...rest.style }} ref={avatarMergeRef} {...rest}>
			{children}
		</span>
	)
})

Avatar.defaultProps = {
	shape: 'rounded',
	size: 'md',
	
}

Avatar.propTypes = {
	shape: PropTypes.oneOf(['rounded', 'square', 'circle']),
	size: PropTypes.oneOfType([
		PropTypes.oneOf(['sm', 'md', 'lg']),
		PropTypes.number
	]),
	icon: PropTypes.node,
	src: PropTypes.string,
	srcSet: PropTypes.string,
	alt: PropTypes.string,
}


export default Avatar
