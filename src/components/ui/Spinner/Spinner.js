import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useConfig } from '../ConfigProvider'
import { CgSpinner } from 'react-icons/cg'

const Spinner = React.forwardRef((props, ref) => {

    const { 
        className, 
        color,
        enableTheme, 
        indicator: Component, 
        isSpining, 
        size, 
        style,
        ...rest 
    } = props

    const { themeColor, primaryColorLevel } = useConfig()

    const spinnerColor = color || (enableTheme && `${themeColor}-${primaryColorLevel}`)

    const spinnerStyle = {
        height: size,
        width: size,
        ...style
    }

    const spinnerClass = classNames(
        isSpining && 'animate-spin',
        spinnerColor && `text-${spinnerColor}`, 
        className
    )

    return (
        <Component ref={ref} style={spinnerStyle} className={spinnerClass} {...rest} />
    )
})

Spinner.defaultProps = {
    indicator: CgSpinner,
    isSpining: true,
    size: 20,
    enableTheme: true
}

Spinner.propTypes = {
	size: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    color: PropTypes.string,
    indicator: PropTypes.elementType,
    isSpining: PropTypes.bool,
    enableTheme: PropTypes.bool,
}

export default Spinner
