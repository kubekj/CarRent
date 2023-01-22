import React from "react";

import DeleteButton from "components/Modals/DeleteButton";
import ReservationForm from "components/Modals/ReservationForm";

//MUI
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function ReservationsTable(props) {
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
                Wszystkie rezerwacje
              </h3>
            </div>
            <div className='relative w-full px-4 max-w-full flex-grow flex-1 text-right'>
              <ReservationForm />
            </div>
          </div>
        </div>
        <div className='block w-full overflow-x-auto'>
          <table className='items-center w-full bg-transparent border-collapse'>
            <thead className='thead-light'>
              <tr>
                <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                  ID rezerwacji
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
                  Status
                </th>
                <th className='px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px'></th>
              </tr>
            </thead>
            <tbody>
              {props.reservations &&
                props.reservations.data?.map((reservation) => {
                  //PROPERTIES
                  const email =
                    reservation.attributes.user.data.attributes.email;

                  const brand =
                    reservation.attributes.car.data.attributes.model.data
                      .attributes.model.data.attributes.brand.data.attributes
                      .name;

                  const model =
                    reservation.attributes.car.data.attributes.model.data
                      .attributes.model.data.attributes.name;

                  const dateFrom = new Date(
                    reservation.attributes.dateFrom
                  ).toLocaleString();

                  const dateTo = new Date(
                    reservation.attributes.dateTo
                  ).toLocaleString();

                  const isPaid = reservation.attributes.isPaid;

                  return (
                    <tr key={reservation.id}>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left'>
                        {reservation.id}
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left'>
                        {email}
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                        {`${brand} ${model}`}
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                        {dateFrom}
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                        {dateTo}
                      </td>
                      <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4'>
                        {isPaid ? (
                          <span>
                            <i className='fas fa-circle text-green-500 mr-2' />
                            Zapłacone
                          </span>
                        ) : (
                          <span>
                            <i className='fas fa-circle text-orange-500 mr-2' />
                            Oczekujące
                          </span>
                        )}
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
                          <DeleteButton
                            deleteEndpoint={`reservations/${reservation.id}`}
                            reloadEndpoint={"/reservations"}
                          />
                        </Stack>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className='flex items-center justify-center w-full p-4'>
            <Pagination
              count={props.reservations.meta.pagination.pageCount}
              page={pageIndex}
              onChange={pageChangeHandler}
            />
          </div>
        </div>
      </div>
    </>
  );
}
