import React from "react";
import Admin from "layouts/Admin.js";
import fetcher, { axiosFetcher } from "lib/rest-api";
import useSWR from "swr";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { dashboardReservations } from "lib/helpers/reservations.queries";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import DeleteButton from "components/Modals/DeleteButton";
import ReservationForm from "components/Modals/ReservationForm";
import { getTokenFromLocalCookie } from "lib/auth";
import { dashboardCars } from "lib/helpers/cars.queries";
import { useFetchUser } from "lib/authContext";
import Router from "next/router";

import { getSession } from "next-auth/react";

export function renderStatus(status) {
  switch (status) {
    case "paid":
      return (
        <span>
          <i className='fas fa-circle text-green-500 mr-2' />
          Zapłacone
        </span>
      );
    case "rented":
      return (
        <span>
          <i className='fas fa-circle text-red-500 mr-2' />
          Wypozyczone
        </span>
      );
    case "returned":
      return (
        <span>
          <i className='fas fa-circle text-blueGray-500 mr-2' />
          Oddane
        </span>
      );
    default:
      return (
        <span>
          <i className='fas fa-circle text-orange-500 mr-2' />
          Oczekujące
        </span>
      );
  }
}

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

export default function Reservations({ jwt }) {
  const [pageIndex, setPageIndex] = useState(1);
  const handleChange = (event, value) => {
    setPageIndex(value);
  };

  const options = {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  };

  const { data: reservations, isLoading: reservationsAreLoading } = useSWR(
    [
      "reservations?" +
        dashboardReservations +
        `&pagination[page]=${pageIndex}&pagination[pageSize]=15`,
      options,
    ],
    ([url, jwt]) => fetcher(url, jwt)
  );

  const { data: cars, isLoading: carsAreLoading } = useSWR(
    ["cars?" + dashboardCars, options],
    ([url, jwt]) => fetcher(url, jwt)
  );

  const { data: users, isLoading: usersAreLoading } = useSWR(
    ["users", options],
    ([url, jwt]) => fetcher(url, jwt)
  );

  if (reservationsAreLoading || carsAreLoading || usersAreLoading)
    return (
      <CircularProgress className='flex items-center justify-center h-screen w-full' />
    );

  return (
    <>
      <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded'>
        <div className='rounded-t mb-0 px-4 py-3 border-0'>
          <div className='flex flex-wrap items-center'>
            <div className='relative w-full px-4 max-w-full flex-grow flex-1'>
              <h3 className='font-semibold text-base text-blueGray-700'>
                Wszystkie rezerwacje
              </h3>
            </div>
            <div className='relative w-full px-4 max-w-full flex-grow flex-1 text-right'>
              <ReservationForm
                cars={cars}
                users={users}
                isEditable={false}
                jwt={jwt}
              />
            </div>
          </div>
        </div>
        <div className='block w-full overflow-x-auto'>
          {/* Projects table */}
          <table className='items-center w-full bg-transparent border-collapse'>
            <thead className='thead-light'>
              <tr>
                <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                  ID
                </th>
                <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                  Email Klienta
                </th>
                <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                  Samochód
                </th>
                <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px'>
                  Data Od
                </th>
                <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px'>
                  Data Do
                </th>
                <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px'>
                  Cena
                </th>
                <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px'>
                  Status
                </th>
                <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px'></th>
              </tr>
            </thead>
            <tbody>
              {reservations ? (
                reservations.data.map((reservation) => {
                  // CAR
                  const brand =
                    reservation.attributes.car.data?.attributes.model.data
                      .attributes.model.data.attributes.brand.data.attributes
                      .name;
                  const model =
                    reservation.attributes.car.data?.attributes.model.data
                      .attributes.model.data.attributes.name;

                  // DATE FROM
                  const dateFrom = new Date(
                    reservation.attributes.dateFrom
                  ).toLocaleString();

                  // DATE TO
                  const dateTo = new Date(
                    reservation.attributes.dateTo
                  ).toLocaleString();

                  const price = reservation.attributes.price;

                  return (
                    <tr key={reservation.id}>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left'>
                        {reservation.id}
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left'>
                        {reservation.attributes.user.data?.attributes.email}
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                        {brand + " " + model}
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                        {dateFrom}
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                        {dateTo}
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                        {price}
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                        {renderStatus(reservation.attributes.status)}
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                        <Stack
                          direction='row'
                          spacing={2}
                          className='items-center'
                        >
                          <ReservationForm
                            jwt={jwt}
                            reservation={reservation}
                            isEditable={true}
                            users={users}
                            cars={cars}
                          />
                          <DeleteButton
                            jwt={jwt}
                            deleteEndpoint={`reservations/${reservation.id}`}
                            reloadEndpoint={"/reservations"}
                          />
                        </Stack>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <CircularProgress />
              )}
            </tbody>
          </table>
          <div className='flex items-center justify-center w-full p-4'>
            <Pagination
              count={reservations?.meta.pagination.pageCount}
              page={pageIndex}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}

Reservations.layout = Admin;
