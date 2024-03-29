import React from 'react'
import { BaseIcon, IconLogo } from '../common/icons'

const Header = () => {
  return (
    <div className="h-[60px] w-full bg-primary flex items-center px-4 gap-2">
      <div className="w-[48px] h-[48px] rounded-full">
        <BaseIcon width={48} height={48}>
          <IconLogo />
        </BaseIcon>
      </div>
      <h2 className="font-bold text-xl text-white">CCAMS BẮC HẢI</h2>
    </div>
  )
}

export default Header