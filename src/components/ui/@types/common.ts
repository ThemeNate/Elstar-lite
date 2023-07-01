import {
    ReactNode,
    CSSProperties,
    // ElementType
} from 'react'

export interface CommonProps {
    className?: string
    children?: ReactNode
    style?: CSSProperties
}

export type WithProps = CommonProps

// eslint-disable-next-line @typescript-eslint/no-namespace
export declare namespace TypeAttributes {
    type Size = 'lg' | 'md' | 'sm' | 'xs'
    type Shape = 'round' | 'circle' | 'none'
    type Status = 'success' | 'warning' | 'danger' | 'info'
    type FormLayout = 'horizontal' | 'vertical' | 'inline'
    type ControlSize = 'lg' | 'md' | 'sm'
    type MenuVariant = 'light' | 'dark' | 'themed' | 'transparent'
    type Direction = 'ltr' | 'rtl'
}

export type StepStatus = 'complete' | 'pending' | 'in-progress' | 'error'

export type ColorLevel =
    | 50
    | 100
    | 200
    | 300
    | 400
    | 500
    | 600
    | 700
    | 800
    | 900
