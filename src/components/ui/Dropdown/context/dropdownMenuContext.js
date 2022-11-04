import { createContext, useState, useRef, useCallback } from 'react'
import isNil from 'lodash/isNil'

const DropdownMenuContext = createContext()

export const DropdownMenuContextProvider = DropdownMenuContext.Provider

export const DropdownMenuContextConsumer = DropdownMenuContext.Consumer

export function useDropdownMenuContext (menuRef) {

	const [open, setOpen] = useState(false)

	const [items, setItems] = useState([])
	const [activeItemIndex, setActiveItemIndex] = useState(null)
	const previousActiveElementRef = useRef(null)

	const registerItem = useCallback((element, props) => {
		setItems(items => [...items, { element, props }])
	}, [])

	const unregisterItem = useCallback((id) => {
		setItems(items => items.filter(item => item.element.id !== id))
	}, [])

	const focusSelf = useCallback(() => {
		requestAnimationFrame(() => {
			if (document.activeElement !== menuRef.current) {
				previousActiveElementRef.current = document.activeElement
				menuRef.current?.focus()
			}
		})
	}, [menuRef])

	const focusItem = useCallback(
		(item) => {
			const itemIndex = items.indexOf(item)
			if (itemIndex !== -1) {
				setActiveItemIndex(itemIndex)
				focusSelf()
			}
		},
		[items, focusSelf]
	)

	const lookupNextActiveItemIndex = useCallback((start, direction) => {
		for (let i = start; i > -1 && i < items.length; i += direction) {
			if (!items[i].props?.disabled) {
				return i
			}
		}
		return null
	}, [items])

	const focusItemAt = useCallback((index) => {
		if (isNil(index)) {
			setActiveItemIndex(null)
			focusSelf()
		} else {
			let activeItemIndex
			if (index === 0) {
				activeItemIndex = lookupNextActiveItemIndex(0, 1)
			} else if (index === -1) {
				activeItemIndex = lookupNextActiveItemIndex(items.length - 1, -1)
			}

			if (!isNil(activeItemIndex)) {
				focusItem(items[activeItemIndex])
			}
		}
	}, [items, focusItem, focusSelf, lookupNextActiveItemIndex])

	const openMenu = useCallback(() => {
		setOpen(true)
		focusSelf()
	}, [focusSelf])

	const closeMenu = useCallback(() => {
		setOpen(false)
		setActiveItemIndex(null)
		requestAnimationFrame(() => {
			previousActiveElementRef.current?.focus()
		})
	}, [])
  
    return (
		{
			open,
			items,
			activeItemIndex,
			registerItem,
			unregisterItem,
			focusItemAt,
			openMenu,
			closeMenu
		}
    )
}

export default DropdownMenuContext