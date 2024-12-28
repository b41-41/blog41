import React from 'react'

const Header = () => {
  return (
    <header className="w-[1000px] flex flex-col relative">
      <div className="rounded-b-md w-[1000px] h-[270px] border-b-2 border-x-2 border-primary-dark">header 이미지 영역</div>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[-20px]">header 메뉴 영역</div>
    </header>
  )
}

export default Header