import { forwardRef } from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2'
import type { ScrollbarProps as ReactCustomScrollbarProps } from 'react-custom-scrollbars-2'
import type { TypeAttributes } from '../@types/common'

export interface ScrollbarProps extends ReactCustomScrollbarProps {
    direction?: TypeAttributes.Direction
}

export type ScrollbarRef = Scrollbars

const ScrollBar = forwardRef<ScrollbarRef, ScrollbarProps>((props, ref) => {
    const { direction = 'ltr', ...rest } = props

    return (
        <Scrollbars
            ref={ref}
            renderView={(props) => (
                <div
                    {...props}
                    style={{
                        ...props.style,
                        ...(direction === 'rtl' && {
                            marginLeft: props.style.marginRight,
                            marginRight: 0,
                        }),
                    }}
                />
            )}
            {...rest}
        />
    )
})

ScrollBar.displayName = 'ScrollBar'

export default ScrollBar
