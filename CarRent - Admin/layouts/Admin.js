import React from "react";
import { UserProvider } from "lib/authContext";

// components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";

export default function Admin({ children }) {
  return (
    <>
      <Sidebar />
      <div className='relative md:ml-64 h-screen'>
        <AdminNavbar />
        <div className='px-4 md:px-10 mx-auto w-full -m-24'>{children}</div>
      </div>
    </>
  );
}
