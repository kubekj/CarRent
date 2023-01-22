import Image from "next/image";
import React from "react";
import LogoIcon from "../assets/icons/logo.png";

export default function Footer() {
  return (
    <footer className='flex flex-col items-center bg-[#F5F5F5] inset-x-0 bottom-0'>
      <div className='flex flex-row items-center justify-between space-x-6 py-6 px-[30px] mx-auto w-full'>
        <Image src={LogoIcon} className=" w-20 h-[30px]" alt='car logo'/>
        <h3 className='text-sm font-medium text-gray-500 '>
          © 2023 Grupa A CMS Projekt.
        </h3>
      </div>
    </footer>
  );
}
