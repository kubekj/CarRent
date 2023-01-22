import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Router from "next/router";

//MUI
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { poster, putter } from "lib/rest-api";

function transformForPost(data) {
  const transformed = {
    data: {
      user: data.userId,
      car: data.carId,
      dateFrom: data.dateFrom,
      dateTo: data.dateTo,
      price: data.price,
      status: data.status,
    },
  };
  return transformed;
}

function transformForPut(data) {
  const transformed = {
    data: {
      dateFrom: data.dateFrom,
      dateTo: data.dateTo,
      price: data.price,
      status: data.status,
    },
  };

  return transformed;
}

export default function ReservationForm({
  cars,
  users,
  isEditable,
  jwt,
  reservation,
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const today = new Date();
  const tommorow = new Date();
  tommorow.setDate(today.getDate() + 1);

  const validationSchema = yup.object({
    userId: yup.number().required("Wybierz uzytkownika"),
    carId: yup.number().required("Wybierz samochód"),
    dateFrom: yup.date().default(today),
    dateTo: yup.date().default(tommorow),
    price: yup.number().min(100, "Cena nie moze być mniejsza niz 100"),
    status: yup.string().required("Podaj status rezerwacji"),
  });

  const formik = useFormik({
    initialValues: {
      userId: reservation ? reservation.attributes.user.data?.id : "",
      carId: reservation ? reservation.attributes.car.data?.id : "",
      dateFrom: reservation ? reservation.attributes.dateFrom : today,
      dateTo: reservation ? reservation.attributes.dateTo : tommorow,
      price: reservation ? reservation.attributes.price : 0,
      status: reservation ? reservation.attributes.status : "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      reservation
        ? await putter(
            `reservations/${reservation.id}`,
            transformForPut(values),
            jwt
          )
        : await poster("reservations", transformForPost(values), jwt);
      Router.reload("/reservations");
      handleClose();
    },
  });

  const dialogTitle = !isEditable
    ? "Dodaj nową rezerwację"
    : "Edytuj rezerwacje";

  return (
    <div>
      <Button
        variant='contained'
        color={isEditable ? "warning" : "info"}
        size='small'
        onClick={handleClickOpen}
      >
        {isEditable ? "Edytuj" : "Dodaj"}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"lg"}
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle id='name'>{dialogTitle}</DialogTitle>
          <DialogContent>
            <InputLabel id='userId' htmlFor='userId' className='p-2'>
              Użytkownik
            </InputLabel>
            <Select
              labelId='userId'
              id='user-select'
              name='userId'
              value={formik.values.userId || ""}
              error={formik.touched.userId && Boolean(formik.errors.userId)}
              className={`w-full ${
                formik.touched.userId && formik.errors.userId
                  ? "border-red-500"
                  : ""
              }`}
              onChange={formik.handleChange}
              disabled={isEditable}
            >
              {users.map((user) => {
                return (
                  <MenuItem key={user.id} value={user.id}>
                    {user.email}
                  </MenuItem>
                );
              })}
            </Select>
            {formik.touched.userId && formik.errors.userId && (
              <span className='text-red-500'>{formik.errors.userId}</span>
            )}
            <InputLabel id='carId' htmlFor='carId' className='p-2'>
              Samochód
            </InputLabel>
            <Select
              labelId='carId'
              id='car-select'
              name='carId'
              value={formik.values.carId}
              error={formik.touched.carId && Boolean(formik.errors.carId)}
              className={`w-full ${
                formik.touched.carId && formik.errors.carId
                  ? "border-red-500"
                  : ""
              }`}
              onChange={formik.handleChange}
              disabled={isEditable}
            >
              {cars.data.map((car) => {
                return (
                  <MenuItem key={car.id} value={car.id}>
                    {`${car.attributes.model.data.attributes.model.data.attributes.brand.data.attributes.name} ${car.attributes.model.data.attributes.model.data.attributes.name}`}
                  </MenuItem>
                );
              })}
            </Select>
            {formik.touched.carId && formik.errors.carId && (
              <span className='text-red-500'>{formik.errors.carId}</span>
            )}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DialogContentText className='p-2'>Data Od</DialogContentText>
              <DesktopDatePicker
                inputFormat='MM/DD/YYYY'
                value={formik.values.dateFrom}
                className='w-full'
                name='dateFrom'
                error={
                  formik.touched.dateFrom && Boolean(formik.errors.dateFrom)
                }
                onChange={(value) => formik.setFieldValue("dateFrom", value)}
                renderInput={(params) => <TextField {...params} />}
              />
              <DialogContentText className='p-2'>Data do</DialogContentText>
              <DesktopDatePicker
                inputFormat='MM/DD/YYYY'
                value={formik.values.dateTo}
                className='w-full'
                name='dateTo'
                error={formik.touched.dateTo && Boolean(formik.errors.dateTo)}
                onChange={(value) => formik.setFieldValue("dateTo", value)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <DialogContentText className='p-2'>Cena</DialogContentText>
            <TextField
              id='price'
              name='price'
              type='number'
              error={formik.touched.price && Boolean(formik.errors.price)}
              className={`w-full ${
                formik.touched.price && formik.errors.price
                  ? "border-red-500"
                  : ""
              }`}
              fullWidth
              value={formik.values.price}
              onChange={formik.handleChange}
            />
            {formik.touched.price && formik.errors.price && (
              <span className='text-red-500'>{formik.errors.price}</span>
            )}
            <InputLabel id='status' htmlFor='status' className='p-2'>
              Status
            </InputLabel>
            <Select
              labelId='status'
              id='status-select'
              name='status'
              value={formik.values.status}
              error={formik.touched.status && Boolean(formik.errors.status)}
              className={`w-full ${
                formik.touched.status && formik.errors.status
                  ? "border-red-500"
                  : ""
              }`}
              onChange={formik.handleChange}
            >
              <MenuItem key={1} value={"paid"}>
                Zapłacone
              </MenuItem>
              <MenuItem key={2} value={"notPaid"}>
                Nie opłacone
              </MenuItem>
              <MenuItem key={3} value={"rented"}>
                Wypozyczone
              </MenuItem>
              <MenuItem key={4} value={"returned"}>
                Zwrocone
              </MenuItem>
            </Select>
            {formik.touched.status && formik.errors.status && (
              <span className='text-red-500'>{formik.errors.status}</span>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Anuluj</Button>
            <Button variant='contained' size='small' type='submit'>
              {!reservation ? "Dodaj" : "Edytuj"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
