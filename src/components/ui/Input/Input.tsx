import { forwardRef, useState, useEffect, useMemo, useRef } from 'react'
import classNames from 'classnames'
import { useConfig } from '../ConfigProvider'
import { useForm } from '../Form/context'
import { useInputGroup } from '../InputGroup/context'
import { CONTROL_SIZES } from '../utils/constants'
import isEmpty from 'lodash/isEmpty'
import isNil from 'lodash/isNil'
import get from 'lodash/get'
import type { CommonProps, TypeAttributes } from '../@types/common'
import type {
    InputHTMLAttributes,
    ElementType,
    ReactNode,
    HTMLInputTypeAttribute,
} from 'react'

export interface InputProps
    extends CommonProps,
        Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
    asElement?: ElementType
    disabled?: boolean
    invalid?: boolean
    prefix?: string | ReactNode
    size?: TypeAttributes.ControlSize
    suffix?: string | ReactNode
    textArea?: boolean
    type?: HTMLInputTypeAttribute
    unstyle?: boolean
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    field?: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form?: any
}

const Input = forwardRef<ElementType | HTMLInputElement, InputProps>(
    (props, ref) => {
        const {
            asElement: Component = 'input',
            className,
            disabled,
            invalid,
            prefix,
            size,
            suffix,
            textArea,
            type = 'text',
            style,
            unstyle = false,
            field,
            form,
            ...rest
        } = props

        const [prefixGutter, setPrefixGutter] = useState(0)
        const [suffixGutter, setSuffixGutter] = useState(0)

        const { themeColor, controlSize, primaryColorLevel, direction } =
            useConfig()
        const formControlSize = useForm()?.size
        const inputGroupSize = useInputGroup()?.size

        const inputSize =
            size || inputGroupSize || formControlSize || controlSize

        const fixControlledValue = (
            val: string | number | readonly string[] | undefined
        ) => {
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
            if (!isEmpty(form)) {
                const { touched, errors } = form
                const touchedField = get(touched, field.name)
                const errorField = get(errors, field.name)
                validate = touchedField && errorField
            }
            if (typeof invalid === 'boolean') {
                validate = invalid
            }
            return validate
        }, [form, invalid, field])

        const inputDefaultClass = 'input'
        const inputSizeClass = `input-${inputSize} h-${CONTROL_SIZES[inputSize]}`
        const inputFocusClass = `focus:ring-${themeColor}-${primaryColorLevel} focus-within:ring-${themeColor}-${primaryColorLevel} focus-within:border-${themeColor}-${primaryColorLevel} focus:border-${themeColor}-${primaryColorLevel}`
        const inputWrapperClass = `input-wrapper ${
            prefix || suffix ? className : ''
        }`
        const inputClass = classNames(
            inputDefaultClass,
            !textArea && inputSizeClass,
            !isInvalid && inputFocusClass,
            !prefix && !suffix ? className : '',
            disabled && 'input-disabled',
            isInvalid && 'input-invalid',
            textArea && 'input-textarea'
        )

        const prefixNode = useRef<HTMLDivElement>(null)
        const suffixNode = useRef<HTMLDivElement>(null)

        const getAffixSize = () => {
            if (!prefixNode.current && !suffixNode.current) {
                return
            }
            const prefixNodeWidth = prefixNode?.current?.offsetWidth
            const suffixNodeWidth = suffixNode?.current?.offsetWidth

            if (isNil(prefixNodeWidth) && isNil(suffixNodeWidth)) {
                return
            }

            if (prefixNodeWidth) {
                setPrefixGutter(prefixNodeWidth)
            }

            if (suffixNodeWidth) {
                setSuffixGutter(suffixNodeWidth)
            }
        }

        useEffect(() => {
            getAffixSize()
        }, [prefix, suffix])

        const remToPxConvertion = (pixel: number) => 0.0625 * pixel

        const affixGutterStyle = () => {
            const leftGutter = `${remToPxConvertion(prefixGutter) + 1}rem`
            const rightGutter = `${remToPxConvertion(suffixGutter) + 1}rem`
            const gutterStyle: {
                paddingLeft?: string
                paddingRight?: string
            } = {}

            if (direction === 'ltr') {
                if (prefix) {
                    gutterStyle.paddingLeft = leftGutter
                }

                if (suffix) {
                    gutterStyle.paddingRight = rightGutter
                }
            }

            if (direction === 'rtl') {
                if (prefix) {
                    gutterStyle.paddingRight = leftGutter
                }

                if (suffix) {
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
            ...rest,
        }

        const renderTextArea = (
            <textarea style={style} {...inputProps}></textarea>
        )

        const renderInput = (
            <Component
                style={{ ...affixGutterStyle(), ...style }}
                {...inputProps}
            />
        )

        const renderAffixInput = (
            <span className={inputWrapperClass}>
                {prefix ? (
                    <div ref={prefixNode} className="input-suffix-start">
                        {' '}
                        {prefix}{' '}
                    </div>
                ) : null}
                {renderInput}
                {suffix ? (
                    <div ref={suffixNode} className="input-suffix-end">
                        {suffix}
                    </div>
                ) : null}
            </span>
        )

        const renderChildren = () => {
            if (textArea) {
                return renderTextArea
            }

            if (prefix || suffix) {
                return renderAffixInput
            } else {
                return renderInput
            }
        }

        return renderChildren()
    }
)

Input.displayName = 'Input'

export default Input
