import React from 'react'
import style from './Footer.module.css'
import Image from 'next/image'
import { Github } from 'lucide-react';

const Footer = () => {
  return (
    <div className={`${style["footer-container"]}`}>
      <div className="flex gap-2 items-center">
        <Image src="/image/logo.png" width={30} height={30} alt="logo" />
        <p className="text-sm text-slate-500 font-mono"> © 2024</p>
        <span className="flex-1 text-center font-semibold  text-xs text-blue-500">
          All system normal
        </span>
        <Github className="w-4 h-4 fill-black" />
      </div>
    </div>
  );
}

export default Footer