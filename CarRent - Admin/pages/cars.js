import React, { useState } from "react";
import Admin from "layouts/Admin.js";
import { dashboardCars } from "../lib/helpers/cars.queries";
import fetcher from "lib/rest-api";
import useSWR from "swr";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import CarForm from "components/Modals/CreateCarForm";
import DeleteButton from "components/Modals/DeleteButton";
import { useFetchUser } from "lib/authContext";
import Router from "next/router";

import { getSession } from "next-auth/react";
import EditCarForm from "components/Modals/EditCarForm";

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

export default function Cars({ jwt }) {
  const [pageIndex, setPageIndex] = useState(1);
  const handleChange = (event, value) => {
    setPageIndex(value);
  };

  const { data, isLoading } = useSWR(
    "cars?" +
      dashboardCars +
      `&pagination[page]=${pageIndex}&pagination[pageSize]=15`,
    fetcher
  );

  const { data: brands, isLoading: brandsLoading } = useSWR("brands", fetcher);
  const { data: bodyTypes, isLoading: bodyTypesLoading } = useSWR(
    "body-types",
    fetcher
  );

  if (isLoading || brandsLoading || bodyTypesLoading)
    return <CircularProgress className='w-full items-center' />;

  return (
    <>
      <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded'>
        <div className='rounded-t mb-0 px-4 py-3 border-0'>
          <div className='flex flex-wrap items-center'>
            <div className='relative w-full px-4 max-w-full flex-grow flex-1'>
              <h3 className='font-semibold text-base text-blueGray-700'>
                Wszystkie samochody
              </h3>
            </div>
            <div className='relative w-full px-4 max-w-full flex-grow flex-1 text-right'>
              <CarForm
                isEditable={false}
                jwt={jwt}
                brands={brands}
                bodyTypes={bodyTypes}
              ></CarForm>
            </div>
          </div>
        </div>
        <div className='block w-full overflow-x-auto'>
          {/* Projects table */}
          <table className='items-center w-full bg-transparent border-collapse'>
            <thead>
              <tr>
                <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                  ID
                </th>
                <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                  Zdjęcie
                </th>
                <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                  Model
                </th>
                <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                  Marka
                </th>
                <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                  Maksymalna prędkość
                </th>
                <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                  Konie mechaniczne
                </th>
                <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                  Rok produkcji
                </th>
                <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                  Cena za dzień
                </th>
                <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'></th>
              </tr>
            </thead>
            <tbody>
              {data ? (
                data.data.map((car) => {
                  //PROPERTIES
                  const carPhotoUrl =
                    car.attributes.picture.data?.attributes.formats.small.url;

                  return (
                    <tr key={car.id}>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                        {car.id}
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left'>
                        <Avatar alt='Car photo' src={carPhotoUrl} />
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                        {
                          car.attributes.model.data?.attributes.model.data
                            .attributes.name
                        }
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                        {
                          car.attributes.model.data?.attributes.model.data
                            .attributes.brand.data.attributes.name
                        }
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                        {car.attributes.maxSpeed}
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                        {car.attributes.horsePower}
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                        {car.attributes.year}
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                        {car.attributes.pricePerDay}
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                        <Stack
                          direction='row'
                          spacing={2}
                          className='items-center'
                        >
                          <EditCarForm jwt={jwt} car={car} />
                          <DeleteButton
                            deleteEndpoint={`cars/${car.id}`}
                            reloadEndpoint={"/cars"}
                            jwt={jwt}
                          />
                        </Stack>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <CircularProgress className='w-full items-center' />
              )}
            </tbody>
          </table>
          <div className='flex items-center justify-center w-full p-4'>
            <Pagination
              count={data?.meta.pagination.pageCount}
              page={pageIndex}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}

Cars.layout = Admin;
