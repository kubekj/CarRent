import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Hero() {
  return (
    <div className='flex flex-col items-center text-gray-700'>
      <div className='flex flex-col sm:flex-row p-12 items-center text-center sm:text-left justify-between gap-20'>
        <div className='flex flex-col gap-y-6'>
          <div className='gap-6 flex flex-col'>
            <h1 className='text-6xl'>
              Samochód o którym zawsze{" "}
              <span className='text-purple-400'>marzyłeś</span>
            </h1>
            <p className='text-2xl'>
              <span className='font-semibold'>Porsche 911 GT3 RS</span> czy może{" "}
              <span className='font-semibold'>BMW M4</span>? A jeśli nadal nie
              zrobiło to na tobie wrażenia to polecamy spojrzeć poniżej!
            </p>
          </div>
          <div>
            <Link href="/cars">
              <button className='bg-[#F5F5F5] text-[#6941C6] hover:bg-purple-400 text-purple-400 hover:text-white font-bold py-4 px-12 rounded mt-10'>Wszystkie samochody</button>
            </Link>
          </div>
        </div>
        <div>
          <Image
            src='https://images.unsplash.com/photo-1603658313849-58e9848fbf29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
            alt='Lamborgini photo'
            width={700}
            height={500}
            className='rounded-tr-[64px] rounded-bl-[64px]'
          ></Image>
        </div>
      </div>
    </div>
  );
}
