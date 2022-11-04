import React, { useState, useEffect, useMemo, useRef } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useConfig } from '../ConfigProvider'
import { useForm } from '../Form/context'
import { useInputGroup } from '../InputGroup/context'
import { CONTROL_SIZES, SIZES } from '../utils/constant'
import isEmpty from 'lodash/isEmpty'
import isNil from 'lodash/isNil'
import get from 'lodash/get'

const Input = React.forwardRef((props, ref) => {

	const {
		asElement: Component,
		className,
		disabled,
		invalid,
		prefix,
		size,
		suffix,
		textArea,
		type, 
		style,
		unstyle,
		field,
		form,
		...rest 
	} = props

	const [prefixGutter, setPrefixGutter] = useState(0)
	const [suffixGutter, setSuffixGutter] = useState(0)
	
	const { themeColor, controlSize, primaryColorLevel, direction } = useConfig()
	const formControlSize = useForm()?.size
	const inputGroupSize = useInputGroup()?.size

	const inputSize = size || inputGroupSize ||  formControlSize || controlSize 

	const fixControlledValue = val => {
		if (typeof val === 'undefined' || val === null) {
			return ''
		}
		return val
	}

	if ('value' in props) {
		rest.value = fixControlledValue(props.value)
		delete rest.defaultValue
	}

	const isInvalid = useMemo(() => {
		let validate = false
		if(!isEmpty(form)) {
			const { touched, errors } = form
			const touchedField = get(touched, field.name)
			const errorField = get(errors, field.name)
			validate = touchedField && errorField
		}
		if(typeof invalid === 'boolean') {
			validate = invalid
		}
		return validate
	}, [form, invalid, field])

	const inputDefaultClass = 'input'
	const inputSizeClass = `input-${inputSize} h-${CONTROL_SIZES[inputSize]}`
	const inputFocusClass = `focus:ring-${themeColor}-${primaryColorLevel} focus-within:ring-${themeColor}-${primaryColorLevel} focus-within:border-${themeColor}-${primaryColorLevel} focus:border-${themeColor}-${primaryColorLevel}`
	const inputWrapperClass = `input-wrapper ${prefix || suffix ? className : ''}`
	const inputClass = classNames(
		inputDefaultClass,
		!textArea && inputSizeClass,
		!isInvalid && inputFocusClass, 
		(!prefix && !suffix ? className : ''),
		disabled && 'input-disabled',
		isInvalid && 'input-invalid',
		textArea && 'input-textarea'
	)

	const prefixNode = useRef()
	const suffixNode = useRef()

	const getAffixSize = () => {

		if (!prefixNode.current && !suffixNode.current) {
			return
		}
		const prefixNodeWidth = prefixNode?.current?.offsetWidth 
		const suffixNodeWidth = suffixNode?.current?.offsetWidth

		if(isNil(prefixNodeWidth) && isNil(suffixNodeWidth)) {
			return
		}

		if(prefixNodeWidth) {
			setPrefixGutter(prefixNodeWidth)
		}

		if(suffixNodeWidth) {
			setSuffixGutter(suffixNodeWidth)
		}
	}

	useEffect(() => {
		getAffixSize()
	}, [prefix, suffix])

	const remToPxConvertion = pixel => (0.0625 * pixel)

	const affixGutterStyle = () => {
		const leftGutter = `${remToPxConvertion(prefixGutter) + 1}rem`
		const rightGutter = `${remToPxConvertion(suffixGutter) + 1}rem`
		let gutterStyle = {}

		if(direction === 'ltr') {
			if(prefix) {
				gutterStyle.paddingLeft = leftGutter
			}
	
			if(suffix) {
				gutterStyle.paddingRight = rightGutter
			}
		}

		if(direction === 'rtl') {
			if(prefix) {
				gutterStyle.paddingRight = leftGutter
			}
	
			if(suffix) {
				gutterStyle.paddingLeft = rightGutter
			}
		}
			
		return gutterStyle
	}

	const inputProps = {
		className: !unstyle ? inputClass : '',
		disabled,
		type,
		ref,
		...field,
		...rest
	}

	const renderTextArea = (
		<textarea style={style} {...inputProps}></textarea>
	)

	const renderInput = (
		<Component style={{...affixGutterStyle(), ...style}} {...inputProps} />
	)

	const renderAffixInput = (
		<span className={inputWrapperClass}>
			{prefix ? <div className="input-suffix-start" ref={(node) => (prefixNode.current = node)}> {prefix} </div> : null}
			{renderInput}
			{suffix ? <div className="input-suffix-end" ref={(node) => (suffixNode.current = node)}>{suffix}</div> : null}
		</span>
	)

	const renderChildren = () => {

		if(textArea) {
			return renderTextArea
		}

		if (prefix || suffix) {
			return renderAffixInput
		} else {
			return renderInput
		}
	}

	return (
		renderChildren()
	)
})

Input.propTypes = {
	asElement: PropTypes.string,
	type: PropTypes.string,
	className: PropTypes.string,
	size: PropTypes.oneOf([SIZES.LG, SIZES.SM, SIZES.MD]),
	value: PropTypes.any,
	invalid: PropTypes.bool,
	suffix: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node
	]),
	prefix: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node
	]),
	unstyle: PropTypes.bool
}

Input.defaultProps = {
	type: 'text',
	asElement: 'input',
	className: '',
	unstyle: false
}

export default Input
