import classNames from 'classnames'
import {
    BsFillCaretDownFill,
    BsFillCaretLeftFill,
    BsFillCaretUpFill,
    BsFillCaretRightFill,
} from 'react-icons/bs'

export type ArrowPlacement =
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'left'
    | 'left-start'
    | 'left-end'

interface ArrowProps {
    placement: ArrowPlacement
    colorDark: string
    color: string
}

const Arrow = ({ placement, color, colorDark }: ArrowProps) => {
    const arrowDefaultClass = `absolute text-${color} dark:text-${colorDark}`

    const getArrow = () => {
        switch (placement) {
            case 'top':
                return (
                    <BsFillCaretDownFill
                        className={classNames(
                            arrowDefaultClass,
                            '-bottom-2 w-full left-0'
                        )}
                    />
                )
            case 'top-start':
                return (
                    <BsFillCaretDownFill
                        className={classNames(
                            arrowDefaultClass,
                            '-bottom-2 left-0 ml-3'
                        )}
                    />
                )
            case 'top-end':
                return (
                    <BsFillCaretDownFill
                        className={classNames(
                            arrowDefaultClass,
                            '-bottom-2 right-0 mr-3'
                        )}
                    />
                )
            case 'right':
                return (
                    <BsFillCaretLeftFill
                        className={classNames(
                            arrowDefaultClass,
                            '-left-2 top-1/2 transform -translate-y-1/2'
                        )}
                    />
                )
            case 'right-start':
                return (
                    <BsFillCaretLeftFill
                        className={classNames(
                            arrowDefaultClass,
                            '-left-2 top-2'
                        )}
                    />
                )
            case 'right-end':
                return (
                    <BsFillCaretLeftFill
                        className={classNames(
                            arrowDefaultClass,
                            '-left-2 bottom-2'
                        )}
                    />
                )
            case 'bottom':
                return (
                    <BsFillCaretUpFill
                        className={classNames(
                            arrowDefaultClass,
                            '-top-2 w-full left-0'
                        )}
                    />
                )
            case 'bottom-start':
                return (
                    <BsFillCaretUpFill
                        className={classNames(
                            arrowDefaultClass,
                            '-top-2 left-0 ml-3'
                        )}
                    />
                )
            case 'bottom-end':
                return (
                    <BsFillCaretUpFill
                        className={classNames(
                            arrowDefaultClass,
                            '-top-2 right-0 mr-3'
                        )}
                    />
                )
            case 'left':
                return (
                    <BsFillCaretRightFill
                        className={classNames(
                            arrowDefaultClass,
                            '-right-2 top-1/2 transform -translate-y-1/2'
                        )}
                    />
                )
            case 'left-start':
                return (
                    <BsFillCaretRightFill
                        className={classNames(
                            arrowDefaultClass,
                            '-right-2 top-2'
                        )}
                    />
                )
            case 'left-end':
                return (
                    <BsFillCaretRightFill
                        className={classNames(
                            arrowDefaultClass,
                            '-right-2 bottom-2'
                        )}
                    />
                )
            default:
                break
        }
    }

    return <div>{getArrow()}</div>
}

export default Arrow
