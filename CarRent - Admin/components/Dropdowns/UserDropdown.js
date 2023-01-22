// import React from "react";
// import { createPopper } from "@popperjs/core";
// import Link from "next/link";
// import { unsetToken } from "lib/auth";

// const UserDropdown = () => {
//   // dropdown props
//   const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
//   const btnDropdownRef = React.createRef();
//   const popoverDropdownRef = React.createRef();
//   const openDropdownPopover = () => {
//     createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
//       placement: "bottom-start",
//     });
//     setDropdownPopoverShow(true);
//   };
//   const closeDropdownPopover = () => {
//     setDropdownPopoverShow(false);
//   };
//   return (
//     <>
//       <a
//         className='text-blueGray-500 block'
//         href='#pablo'
//         ref={btnDropdownRef}
//         onClick={(e) => {
//           e.preventDefault();
//           dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
//         }}
//       >
//         <div className='items-center flex'>
//           <span className='w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full'>
//             <img
//               alt='...'
//               className='w-full rounded-full align-middle border-none shadow-lg'
//               src='/img/team-4-470x470.png'
//             />
//           </span>
//         </div>
//       </a>
//       <div
//         ref={popoverDropdownRef}
//         className={
//           (dropdownPopoverShow ? "block " : "hidden ") +
//           "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
//         }
//       >
//         <a
//           href='/settings'
//           className={
//             "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
//           }
//           onClick={(e) => e.preventDefault()}
//         >
//           <Link href='/settings'>Ustawienia</Link>
//         </a>

//         <div className='h-0 my-2 border border-solid border-blueGray-100' />
//         <a
//           href='/auth/login'
//           className={
//             "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
//           }
//           //onClick={() => unsetToken()}
//         >
//           Wyloguj
//         </a>
//       </div>
//     </>
//   );
// };

// export default UserDropdown;
