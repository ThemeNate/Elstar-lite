/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable  @typescript-eslint/no-explicit-any
import { useMemo } from 'react'
import isPlainObject from 'lodash/isPlainObject'
import type { NavigationTree } from '@/@types/navigation'

interface NavInfo extends NavigationTree {
    parentKey?: string
}

const getRouteInfo = (
    navTree: NavInfo | NavInfo[],
    key: string
): NavInfo | undefined => {
    if (!Array.isArray(navTree) && navTree.key === key) {
        return navTree
    }
    let activedRoute: NavInfo | undefined
    let isIncludeActivedRoute = false
    for (const p in navTree) {
        if (
            p !== 'icon' &&
            // eslint-disable-next-line no-prototype-builtins
            navTree.hasOwnProperty(p) &&
            typeof (navTree as any)[p] === 'object'
        ) {
            if (
                isPlainObject((navTree as any)[p]) &&
                (navTree as any)[p].subMenu.length > 0
            ) {
                if (
                    (navTree as any)[p].subMenu.some(
                        (el: NavInfo) => el.key === key
                    )
                ) {
                    isIncludeActivedRoute = true
                }
            }

            activedRoute = getRouteInfo((navTree as any)[p], key)

            if (activedRoute) {
                if (isIncludeActivedRoute) {
                    activedRoute.parentKey = (navTree as any)[p].key
                }

                return activedRoute
            }
        }
    }
    return activedRoute
}

const findNestedRoute = (navTree: NavigationTree[], key: string): boolean => {
    const found = navTree.find((node) => {
        return node.key === key
    })
    if (found) {
        return true
    }
    return navTree.some((c) => findNestedRoute(c.subMenu, key))
}

const getTopRouteKey = (
    navTree: NavigationTree[],
    key: string
): NavigationTree => {
    let foundNav = {} as NavigationTree
    navTree.forEach((nav) => {
        if (findNestedRoute([nav], key)) {
            foundNav = nav
        }
    })
    return foundNav
}

function useMenuActive(navTree: NavigationTree[], key: string) {
    const activedRoute = useMemo(() => {
        const route = getRouteInfo(navTree, key)
        return route
    }, [navTree, key])

    const includedRouteTree = useMemo(() => {
        const included = getTopRouteKey(navTree, key)
        return included
    }, [navTree, key])

    return { activedRoute, includedRouteTree }
}

export default useMenuActive
