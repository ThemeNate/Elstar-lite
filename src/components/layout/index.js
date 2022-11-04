import React, { memo, useMemo, lazy, Suspense } from 'react'
import { Loading } from 'components/shared'
import { useSelector } from 'react-redux'
import { 
	LAYOUT_TYPE_CLASSIC,
	LAYOUT_TYPE_BLANK
} from 'constants/theme.constant'
import useAuth from 'utils/hooks/useAuth'
import useLocale from 'utils/hooks/useLocale'

const layouts = {
	[LAYOUT_TYPE_CLASSIC]: lazy(() => import('./ClassicLayout')),
	[LAYOUT_TYPE_BLANK]: lazy(() => import('./BlankLayout')),
	// Unlock all layouts in full version
}

const Layout = () => {

	const layoutType = useSelector((state) => state.theme.layout.type)

	const { authenticated } = useAuth()

	useLocale()

	const AppLayout = useMemo(() => {
		if (authenticated) {
			return layouts[layoutType]
		}
		return lazy(() => import('./AuthLayout'))
	}, [layoutType, authenticated])

	return (
		<Suspense 
			fallback={
				<div className="flex flex-auto flex-col h-[100vh]">
					<Loading loading={true} />
				</div>
			}
		>
			<AppLayout />
		</Suspense>
	)
}

export default memo(Layout)