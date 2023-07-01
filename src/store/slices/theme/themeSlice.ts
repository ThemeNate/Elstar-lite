import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { themeConfig } from '@/configs/theme.config'
import {
    LAYOUT_TYPE_CLASSIC,
    NAV_MODE_TRANSPARENT,
    NAV_MODE_LIGHT,
    NAV_MODE_DARK,
    NAV_MODE_THEMED,
    MODE_DARK,
    MODE_LIGHT,
} from '@/constants/theme.constant'
import type {
    LayoutType,
    Mode,
    NavMode,
    ColorLevel,
    Direction,
} from '@/@types/theme'

export type ThemeState = {
    themeColor: string
    direction: Direction
    mode: Mode
    primaryColorLevel: ColorLevel
    panelExpand: boolean
    navMode: NavMode
    cardBordered: boolean
    layout: {
        type: LayoutType
        sideNavCollapse: boolean
        previousType?: LayoutType
    }
}

const initialState: ThemeState = {
    themeColor: themeConfig.themeColor,
    direction: themeConfig.direction,
    mode: themeConfig.mode,
    primaryColorLevel: themeConfig.primaryColorLevel,
    panelExpand: themeConfig.panelExpand,
    cardBordered: themeConfig.cardBordered,
    navMode: themeConfig.navMode,
    layout: themeConfig.layout,
}

const availableNavColorLayouts = [
    LAYOUT_TYPE_CLASSIC,
]

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setDirection: (state, action: PayloadAction<Direction>) => {
            state.direction = action.payload
        },
        setMode: (state, action: PayloadAction<Mode>) => {
            const availableColorNav = availableNavColorLayouts.includes(
                state.layout.type
            )

            if (
                availableColorNav &&
                action.payload === MODE_DARK &&
                state.navMode !== NAV_MODE_THEMED
            ) {
                state.navMode = NAV_MODE_DARK
            }
            if (
                availableColorNav &&
                action.payload === MODE_LIGHT &&
                state.navMode !== NAV_MODE_THEMED
            ) {
                state.navMode = NAV_MODE_LIGHT
            }
            state.mode = action.payload
        },
        setLayout: (state, action: PayloadAction<LayoutType>) => {

            const availableColorNav = availableNavColorLayouts.includes(
                action.payload
            )

            if (availableColorNav && state.mode === MODE_LIGHT) {
                state.navMode = NAV_MODE_LIGHT
            }

            if (availableColorNav && state.mode === MODE_DARK) {
                state.navMode = NAV_MODE_DARK
            }

            state.layout = {
                ...state.layout,
                ...{ type: action.payload },
            }
        },
        setPreviousLayout: (state, action) => {
            state.layout.previousType = action.payload
        },
        setSideNavCollapse: (state, action) => {
            state.layout = {
                ...state.layout,
                ...{ sideNavCollapse: action.payload },
            }
        },
        setNavMode: (state, action: PayloadAction<NavMode | 'default'>) => {
            if (action.payload !== 'default') {
                state.navMode = action.payload
            } else {

                const availableColorNav = availableNavColorLayouts.includes(
                    state.layout.type
                )

                if (availableColorNav && state.mode === MODE_LIGHT) {
                    state.navMode = NAV_MODE_LIGHT
                }

                if (availableColorNav && state.mode === MODE_DARK) {
                    state.navMode = NAV_MODE_DARK
                }
            }
        },
        setPanelExpand: (state, action: PayloadAction<boolean>) => {
            state.panelExpand = action.payload
        },
        setThemeColor: (state, action: PayloadAction<string>) => {
            state.themeColor = action.payload
        },
        setThemeColorLevel: (state, action) => {
            state.primaryColorLevel = action.payload
        },
    },
})

export const {
    setDirection,
    setMode,
    setLayout,
    setSideNavCollapse,
    setNavMode,
    setPanelExpand,
    setThemeColor,
    setThemeColorLevel,
    setPreviousLayout,
} = themeSlice.actions

export default themeSlice.reducer
