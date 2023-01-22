import React from "react";

import LogoutButton from "components/Shared/LogoutButton";

// import UserDropdown from "components/Dropdowns/UserDropdown.js";

export default function Navbar() {
  return (
    <>
      {/* Navbar */}
      <nav className='absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4'>
        <div className='w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4'>
          {/* Brand */}
          <a
            className='text-white text-sm uppercase hidden lg:inline-block font-semibold'
            href='#pablo'
            onClick={(e) => e.preventDefault()}
          >
            Admin Panel
          </a>
          {/* User */}
          <ul className='flex-col md:flex-row list-none items-center hidden md:flex'>
            <LogoutButton />
          </ul>
        </div>
      </nav>
      <div className='relative bg-blueGray-800 md:pt-32 pb-32 pt-12 px-4 md:px-10 mx-auto w-full' />
      {/* End Navbar */}
    </>
  );
}
