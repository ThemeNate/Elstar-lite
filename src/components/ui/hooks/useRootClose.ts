/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useCallback } from 'react'
import { findDOMNode } from 'react-dom'
import type { RefObject, ReactEventHandler } from 'react'

type TargetType = RefObject<Element> | Element | null | undefined

type Options = {
    disabled: boolean
    triggerTarget: TargetType
    overlayTarget: TargetType
    listenEscape?: boolean
}

interface CustomEventListener<T = any> {
    (evt: T): void
}

const domContains = (context: Element, node: (Node & ParentNode) | null) => {
    if (context.contains) {
        return context.contains(node)
    } else if (context.compareDocumentPosition) {
        return (
            context === node ||
            !!(context.compareDocumentPosition(node as Node) & 16)
        )
    }
    if (node) {
        do {
            if (node === context) {
                return true
            }
        } while ((node = node.parentNode))
    }
    return false
}

const getRefTarget = (ref: RefObject<Element> | Element | null | undefined) => {
    return ref && ('current' in ref ? ref.current : ref)
}

function getDOMNode(elementOrRef: any) {
    const element =
        elementOrRef?.root || elementOrRef?.child || getRefTarget(elementOrRef)

    if (element?.nodeType && typeof element?.nodeName === 'string') {
        return element
    }

    // eslint-disable-next-line react/no-find-dom-node
    return findDOMNode(element)
}

function isLeftClickEvent(e: MouseEvent) {
    return e?.button === 0
}

function isModifiedEvent(e: MouseEvent) {
    return !!(e.metaKey || e.altKey || e.ctrlKey || e?.shiftKey)
}

function onEventListener<K extends keyof DocumentEventMap>(
    target: Element | Window | Document | EventTarget,
    eventType: K,
    listener: EventListenerOrEventListenerObject | CustomEventListener,
    options: boolean | AddEventListenerOptions = false
): { off: () => void } {
    target.addEventListener(eventType, listener, options)

    return {
        off() {
            target.removeEventListener(eventType, listener, options)
        },
    }
}

function useRootClose(
    onRootClose: ReactEventHandler | undefined,
    { disabled, triggerTarget, overlayTarget }: Options
) {
    const handleDocumentMouseDown = useCallback(
        (event: any) => {
            const triggerElement = getDOMNode(triggerTarget)
            const overlayElement = getDOMNode(overlayTarget)

            if (triggerElement && domContains(triggerElement, event.target)) {
                return
            }

            if (overlayElement && domContains(overlayElement, event.target)) {
                return
            }

            if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
                return
            }

            onRootClose?.(event)
        },
        [onRootClose, triggerTarget, overlayTarget]
    )

    useEffect(() => {
        const currentTarget = getDOMNode(triggerTarget)

        if (disabled || !currentTarget) return

        const doc = () =>
            (currentTarget && currentTarget.ownerDocument) || document
        const onDocumentMouseDownListener = onEventListener(
            doc(),
            'mousedown',
            handleDocumentMouseDown,
            true
        )

        return () => {
            onDocumentMouseDownListener?.off()
        }
    }, [triggerTarget, disabled, onRootClose, handleDocumentMouseDown])
}

export default useRootClose
