import Image from "next/image";
import Link from "next/link";
import React from "react";
import infoIcon from "../../assets/icons/info_icon.svg";

export default function SummarySection() {
  return (
    <section className='flex flex-col justify-center items-center p-20 gap-12 h-[472px] bg-purple-900'>
      <Image src={infoIcon} alt='info icon'></Image>
      <div className='flex flex-col justify-center items-center text-center gap-12'>
        <h2 className='text-xl sm:text-4xl text-white'>Przekonaj Sie Sam !</h2>
        <Link
          href='/'
          className='flex flex-row justify-center items-center px-4 py-2 sm:px-7 sm:py-4 gap-3 bg-white border border-solid rounded-lg hover:bg-slate-200 text-gray-700'
        >
          Wszystkie samochody
        </Link>
      </div>
    </section>
  );
}
