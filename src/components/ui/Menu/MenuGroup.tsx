import { useContext } from 'react'
import classNames from 'classnames'
import { GroupContextProvider } from './context/groupContext'
import MenuContext from './context/menuContext'
import useUniqueId from '../hooks/useUniqueId'
import type { CommonProps } from '../@types/common'
import type { ReactNode } from 'react'

export interface MenuGroupProps extends CommonProps {
    label: string | ReactNode
}

const MenuGroup = (props: MenuGroupProps) => {
    const { label, children, className } = props

    const { variant, sideCollapsed } = useContext(MenuContext)

    const menuGroupDefaultClass = 'menu-group'
    const menuGroupClass = classNames(menuGroupDefaultClass, className)

    const entityHeaderId = useUniqueId('entity-header-')

    return (
        <div className={menuGroupClass}>
            {label && !sideCollapsed && (
                <div
                    className={classNames(
                        'menu-title',
                        `menu-title-${variant}`
                    )}
                    id={entityHeaderId}
                >
                    {label}
                </div>
            )}
            <GroupContextProvider value={null}>
                <ul>{children}</ul>
            </GroupContextProvider>
        </div>
    )
}

MenuGroup.displayName = 'MenuGroup'

export default MenuGroup
