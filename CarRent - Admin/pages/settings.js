import React from "react";

// components

import CardSettings from "components/Cards/CardSettings.js";

// layout for page

import Admin from "layouts/Admin.js";

export default function Settings() {
  return (
    <>
      <div className='flex flex-wrap'>
        <div className='w-full lg:w-full px-4'>
          <CardSettings />
        </div>
      </div>
    </>
  );
}

Settings.layout = Admin;
