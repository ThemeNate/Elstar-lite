import { forwardRef, ElementType } from 'react'
import classNames from 'classnames'
import { CommonProps } from '@/@types/common'

interface ContainerProps extends CommonProps {
    asElement?: ElementType
}

const Container = forwardRef((props: ContainerProps, ref) => {
    const { className, children, asElement: Component = 'div', ...rest } = props

    return (
        <Component
            ref={ref}
            className={classNames('container mx-auto', className)}
            {...rest}
        >
            {children}
        </Component>
    )
})

Container.displayName = 'Container'

export default Container
