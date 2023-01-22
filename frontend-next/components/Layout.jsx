import React from "react";
import Footer from "./Footer";
import Nav from "./Navbar";
import { ToastContainer } from 'react-toastify';
import Head from "next/head";

export default function Layout({ children }) {
  return (
    <>
      <Nav />
      <ToastContainer />
      <div div style={{flexGrow: "1"}}>{children}</div>
      <Footer />
    </>
  );
}
