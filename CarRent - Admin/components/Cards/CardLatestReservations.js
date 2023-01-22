import { dashboardReservations } from "lib/helpers/reservations.queries";
import React from "react";
import fetcher from "../../lib/rest-api.js";
import useSWR from "swr";
import Link from "next/link";
import { renderStatus } from "pages/reservations.js";

// components
export const CardLatestReservations = (props) => {
  const options = {
    headers: {
      Authorization: `Bearer ${props.jwt}`,
    },
  };

  const { data } = useSWR(
    [
      "reservations?" + dashboardReservations + "&pagination[limit]=10",
      options,
    ],
    ([url, jwt]) => fetcher(url, jwt)
  );

  if (!data) return <>Loading ...</>;

  return (
    <>
      <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded'>
        <div className='rounded-t mb-0 px-4 py-3 border-0'>
          <div className='flex flex-wrap items-center'>
            <div className='relative w-full px-4 max-w-full flex-grow flex-1'>
              <h3 className='font-semibold text-base text-blueGray-700'>
                Najnowsze rezerwacje
              </h3>
            </div>
            <div className='relative w-full px-4 max-w-full flex-grow flex-1 text-right'>
              <button
                className='bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                type='button'
              >
                <Link href='/reservations'>Zobacz wszystkie</Link>
              </button>
            </div>
          </div>
        </div>
        <div className='block w-full overflow-x-auto'>
          {/* Projects table */}
          <table className='items-center w-full bg-transparent border-collapse'>
            <thead className='thead-light'>
              <tr>
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
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.data.map((reservation) => {
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

                  //
                  const email =
                    reservation.attributes.user.data?.attributes.email;

                  return (
                    <tr key={reservation.id}>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left'>
                        {email}
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
                        {renderStatus(reservation.attributes.status)}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CardLatestReservations;
