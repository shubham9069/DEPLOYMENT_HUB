import { AppContext } from '@/context/AppProvider';
import Image from 'next/image';
import React, { useContext } from 'react'

const Loader = () => {
    const{loaderState}:any = useContext(AppContext)
  return (
    <div
      className={`hidden fixed  items-center justify-center inset-0 h-screen w-screen bg-[#ffffff7a]
      `}
      id ="loader"
    >
      <Image
        src="/image/icon/spinner.gif"
        width={35}
        height={35}
        alt="spinner"
      />
    </div>
  );
}

export default Loader