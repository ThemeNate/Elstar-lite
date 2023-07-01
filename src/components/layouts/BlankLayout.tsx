import View from '@/views'
import { setPanelExpand, useAppSelector, useAppDispatch } from '@/store'
import { HiOutlineCog } from 'react-icons/hi'
import classNames from 'classnames'

const ConfiguratorToggle = () => {
    const dispatch = useAppDispatch()
    const themeColor = useAppSelector((state) => state.theme.themeColor)
    const primaryColorLevel = useAppSelector(
        (state) => state.theme.primaryColorLevel
    )

    return (
        <div
            className={classNames(
                'fixed ltr:right-0 rtl:left-0 top-96 p-3 ltr:rounded-tl-md ltr:rounded-bl-md rtl:rounded-tr-md rtl:rounded-br-md text-white text-xl cursor-pointer select-none',
                `bg-${themeColor}-${primaryColorLevel}`
            )}
            onClick={() => {
                dispatch(setPanelExpand(true))
            }}
        >
            <HiOutlineCog />
        </div>
    )
}

const BlankLayout = () => {
    return (
        <div className="app-layout-blank flex flex-auto flex-col h-[100vh]">
            <View />
            <ConfiguratorToggle />
        </div>
    )
}

export default BlankLayout
