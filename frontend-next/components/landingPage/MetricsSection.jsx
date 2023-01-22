import Image from "next/image";
import React from "react";
import featuredIcon from "../../assets/icons/featured_icon.svg";

export default function MetricsSection() {
  return (
    <section className='flex flex-col items-center py-24 pb-40 px-6 gap-16 text-center'>
      <div className='flex flex-col gap-3 items-center'>
        <Image src={featuredIcon} alt='featured icon' />
        <h2 className='text-4xl font-semibold'>
          A to wszystko potwierdzają ponizsze statysytki
        </h2>
      </div>
      <div className='flex flex-col justify-between space-y-6 items-center md:flex-row sm:space-y-0 sm:space-x-48 sm:items-start'>
        <div className='basis-1/3'>
          <span className='text-8xl text-purple-500'>34</span>
          <p className='text-xl'>Sportowych samochodów w naszej ofercie</p>
        </div>
        <div className='basis-1/3'>
          <span className='text-8xl text-purple-500'>93%</span>
          <p className='text-xl'>Opinii powyżej 4 gwiazdek</p>
        </div>
        <div className='basis-1/3'>
          <span className='text-8xl text-purple-500'>345</span>
          <p className='text-xl'>Zadowolonych klientów</p>
        </div>
      </div>
    </section>
  );
}
