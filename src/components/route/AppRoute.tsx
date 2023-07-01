import { useEffect, useCallback } from 'react'
import {
    setLayout,
    setPreviousLayout,
    setCurrentRouteKey,
    useAppSelector,
    useAppDispatch,
} from '@/store'
import { useLocation } from 'react-router-dom'
import type { LayoutType } from '@/@types/theme'
import type { ComponentType } from 'react'

export type AppRouteProps<T> = {
    component: ComponentType<T>
    routeKey: string
    layout?: LayoutType
}

const AppRoute = <T extends Record<string, unknown>>({
    component: Component,
    routeKey,
    ...props
}: AppRouteProps<T>) => {
    const location = useLocation()

    const dispatch = useAppDispatch()

    const layoutType = useAppSelector((state) => state.theme.layout.type)
    const previousLayout = useAppSelector(
        (state) => state.theme.layout.previousType
    )

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

    return <Component {...(props as T)} />
}

export default AppRoute
