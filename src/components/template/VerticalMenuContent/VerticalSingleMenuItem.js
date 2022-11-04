import React from 'react'
import { Menu, Tooltip } from 'components/ui'
import VerticalMenuIcon from './VerticalMenuIcon'
import { Link } from 'react-router-dom'
import { Trans, useTranslation } from 'react-i18next'
import { AuthorityCheck } from 'components/shared'

const { MenuItem } = Menu

const CollapsedItem = ({title, translateKey, children}) => {
	const { t } = useTranslation()

	return (
		<Tooltip title={t(translateKey) || title} placement="right">
			{children}
		</Tooltip>
	)
}

const DefaultItem = (props) => {

	const { nav, onLinkClick, sideCollapsed, userAuthority } = props

	return (
		<AuthorityCheck userAuthority={userAuthority} authority={nav.authority}>
			<MenuItem key={nav.key} eventKey={nav.key} className="mb-2">
				<Link 
					to={nav.path} 
					onClick={() => onLinkClick?.({
						key: nav.key,
						title: nav.title,
						path: nav.path,
					})}
					className="flex items-center h-full w-full"
				> 
					<VerticalMenuIcon icon={nav.icon} />
					{ !sideCollapsed && (
						<span>
							<Trans i18nKey={nav.translateKey} defaults={nav.title} />
						</span>
					)}
				</Link>
			</MenuItem>
		</AuthorityCheck>
	)
}

const VerticalSingleMenuItem = ({nav, onLinkClick, sideCollapsed, userAuthority}) => {

	return (
		<AuthorityCheck userAuthority={userAuthority} authority={nav.authority}>
			{
				sideCollapsed ? (
					<CollapsedItem title={nav.title} translateKey={nav.translateKey}>
						<DefaultItem 
							nav={nav} 
							sideCollapsed={sideCollapsed} 
							onLinkClick={onLinkClick}
							userAuthority={userAuthority}
						/>
					</CollapsedItem>
				)
				:
				(
					<DefaultItem 
						nav={nav} 
						sideCollapsed={sideCollapsed} 
						onLinkClick={onLinkClick}
						userAuthority={userAuthority}
					/>
				)
			}
		</AuthorityCheck>
	)
}

export default VerticalSingleMenuItem
