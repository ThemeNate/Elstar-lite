import React from 'react'
import View from 'views'
import { setPanelExpand } from 'store/theme/themeSlice'
import { useSelector, useDispatch } from 'react-redux'
import { HiOutlineCog } from 'react-icons/hi'
import classNames from 'classnames'

const ConfiguratorToggle = () => {

	const dispatch = useDispatch()
	const themeColor = useSelector(state => state.theme.themeColor)
	const primaryColorLevel = useSelector(state => state.theme.primaryColorLevel)

	return (
		<div 
			className={
				classNames(
					'fixed ltr:right-0 rtl:left-0 top-96 p-3 ltr:rounded-tl-md ltr:rounded-bl-md rtl:rounded-tr-md rtl:rounded-br-md text-white text-xl cursor-pointer select-none',
					`bg-${themeColor}-${primaryColorLevel}`
				)
			} 
			onClick={() => {dispatch(setPanelExpand(true))}}
		>
			<HiOutlineCog />
		</div>
	)
}

const BlankLayout = props => {
	return (
		<div className="app-layout-blank flex flex-auto flex-col h-[100vh]">
			<View {...props}/>
			<ConfiguratorToggle />
		</div>
	)
}

export default BlankLayout