import React, { Children, cloneElement, Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Avatar from './Avatar'
import Tooltip from '../Tooltip'

const GroupContainer = ({children, chained, className}) => (
	<div className={classNames('avatar-group', chained && 'avatar-group-chained', className)}>
		{children}
	</div>
)

const AvatarGroup = props => {

	const { 
		maxCount,
		chained,
		className,
		omittedAvatarTooltip,
		onOmittedAvatarClick,
		omittedAvatarProps,
		omittedAvatarContent,
		children 
	} = props

	const childCount = Children.count(children)

	const childWithKey = Children.toArray(children).map( (child, index) =>
		cloneElement(child, {
			key: `grouped-avatar-${index}`,
		}),
	)

	if(maxCount && maxCount < childCount ) {
		const childToShow = childWithKey.slice(0, maxCount) 
		const overflowCount = childCount - maxCount
		const avatar = (
			<Avatar
				className={onOmittedAvatarClick ? 'cursor-pointer' : ''}
				onClick={() => onOmittedAvatarClick?.()}
				{...omittedAvatarProps}
			>
				{omittedAvatarContent || `+${overflowCount}`}
			</Avatar>
		)

		childToShow.push(
			omittedAvatarTooltip ?
			<Tooltip key="avatar-more-tooltip" title={`${overflowCount} More`}>
				<>{avatar}</>
			</Tooltip>
			:
			<Fragment key="avatar-more-tooltip">{avatar}</Fragment>
    )
		return (<GroupContainer className={className} chained={chained}>{childToShow}</GroupContainer>)
	}

	return (
		<GroupContainer className={className} chained={chained}>{children}</GroupContainer>
	)
}

AvatarGroup.defaultProps = {
	maxCount: 3,
	omittedAvatarTooltip: false,
	chained: false
}

Avatar.propTypes = {
	chained: PropTypes.bool,
	maxCount: PropTypes.number,
	omittedAvatarTooltip: PropTypes.bool,
	omittedAvatarProps: PropTypes.object,
	omittedAvatarContent: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node
	]),
}

export default AvatarGroup
