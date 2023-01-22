import React from "react";
import { useState } from "react";

import CarForm from "components/Modals/CreateCarForm";
import DeleteButton from "components/Modals/DeleteButton";

//MUI
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Pagination from "@mui/material/Pagination";

export default function CarsTable(props) {
  const [pageIndex, setPageIndex] = useState(1);
  const pageChangeHandler = (event, value) => {
    setPageIndex(value);
  };

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
              <CarForm></CarForm>
            </div>
          </div>
        </div>
        <div className='block w-full overflow-x-auto'>
          <table className='items-center w-full bg-transparent border-collapse'>
            <thead>
              <tr>
                <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                  ID Samochodu
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
              {props.cars &&
                props.cars.data.map((car) => {
                  //Properties
                  const carPhotoUrl =
                    `https://cmswarsztatstrapiapp.azurewebsites.net/` +
                    car.attributes.picture.data.attributes.formats.small.url;

                  const model =
                    car.attributes.model.data.attributes.model.data.attributes
                      .name;

                  const brand =
                    car.attributes.model.data.attributes.model.data.attributes
                      .brand.data.attributes.name;

                  const maxSpeed = car.attributes.maxSpeed;
                  const horsePower = car.attributes.horsePower;
                  const year = car.attributes.year;
                  const pricePerDay = car.attributes.pricePerDay;

                  return (
                    <tr key={car.id}>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                        {car.id}
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left'>
                        <Avatar alt='car photo' src={carPhotoUrl} />
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                        {model}
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                        {brand}
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                        {maxSpeed}
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                        {horsePower}
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                        {year}
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                        {pricePerDay}
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                        <Stack
                          direction='row'
                          spacing={2}
                          className='items-center'
                        >
                          <Button
                            variant='contained'
                            color='warning'
                            size='small'
                          >
                            Edytuj
                          </Button>
                          <DeleteButton endpoint={`cars/${car.id}`} />
                        </Stack>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className='flex items-center justify-center w-full p-4'>
            <Pagination
              count={props.cars.meta.pagination.pageCount}
              page={pageIndex}
              onChange={pageChangeHandler}
            />
          </div>
        </div>
      </div>
    </>
  );
}
