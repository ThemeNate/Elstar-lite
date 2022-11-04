import { THEME_ENUM } from 'constants/theme.constant'

/**
 * Since some configurations need to be match with specific themes, 
 * we recommend to use the configuration that generated from demo.
 */

export const themeConfig = {
    themeColor: 'indigo',
    direction: THEME_ENUM.DIR_LTR,
    mode: THEME_ENUM.NAV_MODE_LIGHT,
    locale: 'en',
    primaryColorLevel: 600,
    cardBordered: true,
    panelExpand: false,
    controlSize: 'md',
    navMode: THEME_ENUM.NAV_MODE_LIGHT,
    layout: {
        type: THEME_ENUM.LAYOUT_TYPE_CLASSIC,
        sideNavCollapse: false,
    },
}
