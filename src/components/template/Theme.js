import React from 'react'
import { useSelector } from 'react-redux'
import { ConfigProvider } from 'components/ui'
import { themeConfig } from 'configs/theme.config'

const Theme = props => {

	const theme = useSelector(state => state.theme)

	const currentTheme = {
		...themeConfig,
		...theme
	}

	return (
		<>
			<ConfigProvider value={currentTheme}>
				{props.children}
			</ConfigProvider>
		</>
	)
}

export default Theme
