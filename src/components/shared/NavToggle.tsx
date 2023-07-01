import { HiOutlineMenuAlt2, HiOutlineMenu } from 'react-icons/hi'
import type { CommonProps } from '@/@types/common'

export interface NavToggleProps extends CommonProps {
    toggled?: boolean
}

const NavToggle = ({ toggled, className }: NavToggleProps) => {
    return (
        <div className={className}>
            {toggled ? <HiOutlineMenu /> : <HiOutlineMenuAlt2 />}
        </div>
    )
}

export default NavToggle
