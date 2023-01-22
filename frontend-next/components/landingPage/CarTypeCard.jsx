import Image from "next/image";
import Link from "next/link";
import React from "react";
import arrowIcon from "../../assets/icons/arrow_icon.svg";

export default function CarTypeCard(props) {
  return (
    <Link href='/'>
      <div className='flex flex-col gap-10 justify-items-center'>
        <div className='flex flex-col order-0 self-stretch grow-0 items-center'>
          <Image
            src={props.photo}
            alt='car photo'
            width={64}
            height={0}
            className='absolute rounded-[30px] h-20'
          ></Image>
        </div>
        <div className='flex flex-col items-center pt-4'>
          <div className='flex flex-col items-center pb-8 p-8 gap-8 bg-gray-50 rounded-2xl w-80 sm:w-[600px]'>
            <div className='flex flex-col items-center gap-5'>
              <div className='flex flex-col items-center p-0 gap-2'>
                <h5 className='font-semibold text-xl'>{props.title}</h5>
                <p>{props.body}</p>
              </div>
              <p
                className='text-purple-500 flex flex-row gap-2
                hover:text-purple-800'
              >
                Dowiedz się więcej
                <Image src={arrowIcon} alt='arrow icon'></Image>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
