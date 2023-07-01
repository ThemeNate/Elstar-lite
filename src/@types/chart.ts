/* eslint-disable @typescript-eslint/no-explicit-any */
export type ChartXAxis = {
    type?: 'category' | 'datetime' | 'numeric'
    categories?: any
    overwriteCategories?: number[] | string[] | undefined
    offsetX?: number
    offsetY?: number
    sorted?: boolean
    labels?: {
        show?: boolean
        rotate?: number
        rotateAlways?: boolean
        hideOverlappingLabels?: boolean
        showDuplicates?: boolean
        trim?: boolean
        minHeight?: number
        maxHeight?: number
        style?: {
            colors?: string | string[]
            fontSize?: string
            fontFamily?: string
            fontWeight?: string | number
            cssClass?: string
        }
        offsetX?: number
        offsetY?: number
        format?: string
        formatter?(
            value: string,
            timestamp?: number,
            opts?: any
        ): string | string[]
        datetimeUTC?: boolean
        datetimeFormatter?: {
            year?: string
            month?: string
            day?: string
            hour?: string
            minute?: string
            second?: string
        }
    }
    group?: {
        groups?: { title: string; cols: number }[]
        style?: {
            colors?: string | string[]
            fontSize?: string
            fontFamily?: string
            fontWeight?: string | number
            cssClass?: string
        }
    }
    axisBorder?: {
        show?: boolean
        color?: string
        offsetX?: number
        offsetY?: number
        strokeWidth?: number
    }
    axisTicks?: {
        show?: boolean
        borderType?: string
        color?: string
        height?: number
        offsetX?: number
        offsetY?: number
    }
    tickPlacement?: string
    tickAmount?: number | 'dataPoints'
    min?: number
    max?: number
    range?: number
    floating?: boolean
    decimalsInFloat?: number
    position?: string
    title?: {
        text?: string
        offsetX?: number
        offsetY?: number
        style?: {
            color?: string
            fontFamily?: string
            fontWeight?: string | number
            fontSize?: string
            cssClass?: string
        }
    }
    crosshairs?: {
        show?: boolean
        width?: number | string
        position?: string
        opacity?: number
        stroke?: {
            color?: string
            width?: number
            dashArray?: number
        }
        fill?: {
            type?: string
            color?: string
            gradient?: {
                colorFrom?: string
                colorTo?: string
                stops?: number[]
                opacityFrom?: number
                opacityTo?: number
            }
        }
        dropShadow?: ApexDropShadow
    }
    tooltip?: {
        enabled?: boolean
        offsetY?: number
        formatter?(value: string, opts?: object): string
        style?: {
            fontSize?: string
            fontFamily?: string
        }
    }
}
