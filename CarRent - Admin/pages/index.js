import React, { useEffect, useState } from "react";
import Router from "next/router";

// components
import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardLatestCars from "components/Cards/CardLatestCars.js";
import CardLatestReservations from "components/Cards/CardLatestReservations.js";

// layout for page
import Admin from "layouts/Admin.js";

//logic
import { useFetchUser } from "lib/authContext";

import { getSession } from "next-auth/react";

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        pernament: false,
      },
    };
  }

  return {
    props: { jwt: session.jwt },
  };
}

export default function Dashboard(props) {
  return (
    <>
      <div className='flex flex-wrap'>
        <div className='w-full xl:w-8/12 mb-12 xl:mb-0 px-4'>
          <CardLineChart />
        </div>
        <div className='w-full xl:w-4/12 px-4'>
          <CardBarChart />
        </div>
      </div>
      <div className='flex flex-wrap mt-4'>
        <div className='w-full xl:w-4/12 mb-12 xl:mb-0 px-4'>
          <CardLatestCars />
        </div>
        <div className='w-full xl:w-8/12 px-4'>
          <CardLatestReservations jwt={props.jwt} />
        </div>
      </div>
    </>
  );
}

Dashboard.layout = Admin;
