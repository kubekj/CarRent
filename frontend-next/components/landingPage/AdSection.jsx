import Image from "next/image";
import React from "react";
import check from "../../assets/icons/check_icon.svg";

export default function AdSection(props) {
  return (
    <div className='flex flex-col sm:flex-row items-center w-full pb-24'>
      <div
        className={`flex flex-col gap-6 p-12 pr-16 basis-1/2 ${
          props.orderLast ? "sm:order-last" : "order-first"
        }`}
      >
        <Image src={props.icon} alt='check icon' />
        <h3 className='text-3xl'>{props.title}</h3>
        <p className='text-xl'>{props.body}</p>
        <ul className='flex flex-col gap-2'>
          <li className='flex flex-row items-center gap-x-2'>
            <Image src={check} alt='test' />
            {props.firstItem}
          </li>
          <li className='flex flex-row items-center gap-x-2'>
            <Image src={check} alt='check icon' />
            {props.secondItem}
          </li>
          <li className='flex flex-row items-center gap-x-2'>
            <Image src={check} alt='check icon' />
            {props.thirdItem}
          </li>
        </ul>
      </div>
      <div className='basis-1/2 w-full'>
        <Image
          src={props.image}
          alt='Lamborgini'
          width='0'
          height='0'
          sizes='100vw'
          className='w-full h-[560px] object-cover'
        ></Image>
      </div>
    </div>
  );
}
