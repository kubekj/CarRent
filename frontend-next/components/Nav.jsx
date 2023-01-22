import React from "react";
import Image from "next/image";
import Link from "next/link";
import carLogo from "../assets/png's/carLogo.png";

// export default function Nav() {
//   return (
//     <nav className='bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded'>
//       <div className='container flex flex-wrap items-center justify-between mx-auto'>
//         <Link href='/'>
//           <Image src={carLogo} alt='car logo' />
//         </Link>
//         <div className='flex md:order-2'>
//           <button
//             type='button'
//             className='text-white bg-purple-700-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800'
//           >
//             Zarezerwuj
//           </button>
//           <button
//             data-collapse-toggle='navbar-cta'
//             type='button'
//             className='inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:text-white dark:hover:bg-purple-700 dark:focus:ring-purple-600'
//             aria-controls='navbar-cta'
//             aria-expanded='false'
//           >
//             <span className='sr-only'>Otwórz menu głowne</span>
//             <svg
//               className='w-6 h-6'
//               aria-hidden='true'
//               fill='currentColor'
//               viewBox='0 0 20 20'
//               xmlns='http://www.w3.org/2000/svg'
//             >
//               <path
//                 fill-rule='evenodd'
//                 d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
//                 clip-rule='evenodd'
//               ></path>
//             </svg>
//           </button>
//         </div>
//         <div
//           className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1'
//           id='navbar-cta'
//         >
//           <ul className='flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:border-gray-700'>
//             <li>
//               <Link href='/' className='text-black hover:text-purple-600'>
//                 Strona główna
//               </Link>
//             </li>
//             <li>
//               <Link href='/' className='text-black hover:text-purple-600'>
//                 Samochody
//               </Link>
//             </li>
//             <li>
//               <Link href='/' className='text-black hover:text-purple-600'>
//                 Jak to działa
//               </Link>
//             </li>
//             <li>
//               <Link href='/' className='text-black hover:text-purple-600'>
//                 O nas
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }
export default function Nav() {
  return (
    <nav className='flex flex-col items-center sticky top-0 z-50 bg-white'>
      <div className='flex flex-row items-center justify-between py-6 px-12 mx-auto w-full'>
        <div>
          <Link href='/'>
            <Image src={carLogo} alt='car logo' />
          </Link>
        </div>
        <div>
          <ul className='flex flex-row justify-between gap-x-10'>
            <Link href='/' className='text-black hover:text-purple-600'>
              Strona główna
            </Link>
            <Link href='/' className='text-black hover:text-purple-600'>
              Samochody
            </Link>
            <Link href='/' className='text-black hover:text-purple-600'>
              Jak to działa
            </Link>
            <Link href='/' className='text-black hover:text-purple-600'>
              O nas
            </Link>
          </ul>
        </div>
        <div>
          <Link href='/'>
            <button className='focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-lg px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900'>
              Zarezerwuj
            </button>
          </Link>
        </div>
      </div>
      <hr className='bg-black w-full'></hr>
    </nav>
  );
}
