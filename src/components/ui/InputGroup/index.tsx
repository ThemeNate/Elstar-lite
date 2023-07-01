import type { ForwardRefExoticComponent, RefAttributes } from 'react'
import _InputGroup, { InputGroupProps } from './InputGroup'
import Addon from './Addon'

export type { InputGroupProps } from './InputGroup'
export type { AddonProps } from './Addon'

type CompoundedComponent = ForwardRefExoticComponent<
    InputGroupProps & RefAttributes<HTMLDivElement>
> & {
    Addon: typeof Addon
}

const InputGroup = _InputGroup as CompoundedComponent

InputGroup.Addon = Addon

export { InputGroup }

export default InputGroup
