import { useState, forwardRef } from 'react'
import classNames from 'classnames'
import useTimeout from '../hooks/useTimeout'
import {
    HiCheckCircle,
    HiInformationCircle,
    HiExclamation,
    HiXCircle,
} from 'react-icons/hi'
import { motion } from 'framer-motion'
import CloseButton from '../CloseButton'
import StatusIcon from '../StatusIcon'
import type { TypeAttributes, CommonProps } from '../@types/common'
import type { ReactNode, MouseEvent } from 'react'

export interface AlertProps extends CommonProps {
    closable?: boolean
    customClose?: ReactNode | string
    customIcon?: ReactNode | string
    duration?: number
    title?: ReactNode | string
    onClose?: (e?: MouseEvent<HTMLDivElement>) => void
    rounded?: boolean
    showIcon?: boolean
    triggerByToast?: boolean
    type?: TypeAttributes.Status
}

const DEFAULT_TYPE = 'warning'

const TYPE_MAP = {
    success: {
        backgroundColor: 'bg-emerald-50 dark:bg-emerald-500',
        titleColor: 'text-emerald-700 dark:text-emerald-50',
        textColor: 'text-emerald-500 dark:text-emerald-50',
        iconColor: 'text-emerald-400 dark:text-emerald-50',
        icon: <HiCheckCircle />,
    },
    info: {
        backgroundColor: 'bg-blue-50 dark:bg-blue-500',
        titleColor: 'text-blue-700 dark:text-blue-100',
        textColor: 'text-blue-500 dark:text-blue-100',
        iconColor: 'text-blue-400 dark:text-blue-100',
        icon: <HiInformationCircle />,
    },
    warning: {
        backgroundColor: 'bg-yellow-50 dark:bg-yellow-500',
        titleColor: 'text-yellow-700 dark:text-yellow-50',
        textColor: 'text-yellow-500 dark:text-yellow-50',
        iconColor: 'text-yellow-400 dark:text-yellow-50',
        icon: <HiExclamation />,
    },
    danger: {
        backgroundColor: 'bg-red-50 dark:bg-red-500',
        titleColor: 'text-red-700 dark:text-red-100',
        textColor: 'text-red-500 dark:text-red-100',
        iconColor: 'text-red-400 dark:text-red-100',
        icon: <HiXCircle />,
    },
}

const TYPE_ARRAY: TypeAttributes.Status[] = [
    'success',
    'danger',
    'info',
    'warning',
]

const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
    const {
        children,
        className,
        closable = false,
        customClose,
        customIcon,
        duration = 3000,
        title = null,
        onClose,
        rounded = true,
        showIcon = false,
        triggerByToast = false,
        ...rest
    } = props

    const getType = () => {
        const { type = DEFAULT_TYPE } = props
        if (TYPE_ARRAY.includes(type)) {
            return type
        }
        return DEFAULT_TYPE
    }

    const type = getType()
    const typeMap = TYPE_MAP[type]

    const [display, setDisplay] = useState('show')

    const { clear } = useTimeout(
        onClose as () => void,
        duration,
        (duration as number) > 0
    )

    const handleClose = (e: MouseEvent<HTMLDivElement>) => {
        setDisplay('hiding')
        onClose?.(e)
        clear()
        if (!triggerByToast) {
            setTimeout(() => {
                setDisplay('hide')
            }, 400)
        }
    }

    const renderClose = () => {
        return (
            <div
                className="cursor-pointer"
                role="presentation"
                onClick={(e) => handleClose(e)}
            >
                {customClose || <CloseButton defaultStyle={false} />}
            </div>
        )
    }

    const alertDefaultClass = 'p-4 relative flex'

    const alertClass = classNames(
        'alert',
        alertDefaultClass,
        typeMap.backgroundColor,
        typeMap.textColor,
        !title ? 'font-semibold' : '',
        closable ? 'justify-between' : '',
        closable && !title ? 'items-center' : '',
        rounded && 'rounded-lg',
        className
    )

    if (display === 'hide') {
        return null
    }

    return (
        <motion.div
            ref={ref}
            className={alertClass}
            initial={{ opacity: 1 }}
            animate={display === 'hiding' ? 'exit' : 'animate'}
            transition={{ duration: 0.25, type: 'tween' }}
            variants={{
                animate: {
                    opacity: 1,
                },
                exit: {
                    opacity: 0,
                },
            }}
            {...rest}
        >
            <div className={`flex ${title ? '' : 'items-center'}`}>
                {showIcon && (
                    <StatusIcon
                        iconColor={typeMap.iconColor}
                        custom={customIcon}
                        type={type}
                    />
                )}
                <div className={showIcon ? 'ltr:ml-2 rtl:mr-2' : ''}>
                    {title ? (
                        <div
                            className={`font-semibold mb-1 ${typeMap.titleColor}`}
                        >
                            {title}
                        </div>
                    ) : null}
                    {children}
                </div>
            </div>
            {closable ? renderClose() : null}
        </motion.div>
    )
})

Alert.displayName = 'Alert'

export default Alert
