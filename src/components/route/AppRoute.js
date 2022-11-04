import React, { useEffect, useCallback } from 'react'
import { setLayout, setPreviousLayout } from 'store/theme/themeSlice'
import { setCurrentRouteKey } from 'store/base/commonSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

const AppRoute = ({ component: Component, routeKey, ...props }) => {

	const location = useLocation()

	const dispatch = useDispatch()

	const layoutType = useSelector((state) => state.theme.layout.type)
	const previousLayout = useSelector((state) => state.theme.layout.previousType)

	const handleLayoutChange = useCallback(() => {
		dispatch(setCurrentRouteKey(routeKey))

		if (props.layout && props.layout !== layoutType) {
			dispatch(setPreviousLayout(layoutType))
			dispatch(setLayout(props.layout))
		}

		if (!props.layout && previousLayout && layoutType !== previousLayout) {
			dispatch(setLayout(previousLayout))
			dispatch(setPreviousLayout(''))
		}
	}, [dispatch, layoutType, previousLayout, props.layout, routeKey])

	useEffect(() => {
		handleLayoutChange()
	}, [location, handleLayoutChange])
	
	
	return (
		<Component {...props} />
	)
}

export default AppRoute