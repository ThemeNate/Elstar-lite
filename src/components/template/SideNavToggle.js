import React from 'react'
import withHeaderItem from 'utils/hoc/withHeaderItem'
import { useSelector, useDispatch } from 'react-redux'
import { setSideNavCollapse } from 'store/theme/themeSlice'
import useResponsive from 'utils/hooks/useResponsive'
import { NavToggle } from 'components/shared'

export const SideNavToggle = ({ className }) => {

	const sideNavCollapse = useSelector((state) => state.theme.layout.sideNavCollapse)
	const dispatch = useDispatch()

	const { larger } = useResponsive()

	const onCollapse = () => {
		dispatch(setSideNavCollapse(!sideNavCollapse))
	}

	return (
		<>
			{larger.md && (
				<div 
					className={className}
					onClick={onCollapse}
				>
					<NavToggle className="text-2xl" toggled={sideNavCollapse} />
				</div>
			)}
		</>
	)
}

export default withHeaderItem(SideNavToggle)
