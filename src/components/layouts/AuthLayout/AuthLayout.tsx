import Side from './Side'
import View from '@/views'
import { useAppSelector } from '@/store'
import { LAYOUT_TYPE_BLANK } from '@/constants/theme.constant'

const AuthLayout = () => {
    const layoutType = useAppSelector((state) => state.theme.layout.type)

    return (
        <div className="app-layout-blank flex flex-auto flex-col h-[100vh]">
            {layoutType === LAYOUT_TYPE_BLANK ? (
                <View />
            ) : (
                <Side>
                    <View />
                </Side>
            )}
        </div>
    )
}

export default AuthLayout
