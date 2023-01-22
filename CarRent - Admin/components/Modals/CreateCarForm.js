import * as React from "react";

import { useFormik, Formik } from "formik";
import * as yup from "yup";
import Router from "next/router";
import Image from "next/image";

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
import fetcher, { photoPoster, poster, putter } from "lib/rest-api";

function transformForStrapi(data) {
  const transformed = {
    data: {
      brand: { id: data.brand },
      model: {
        name: data.model,
        yearFrom: data.yearFrom,
        yearTo: data.yearTo,
      },
      description: data.description,
      engine: data.engine,
      maxSpeed: data.maxSpeed,
      horsePower: data.horsePower,
      fuel: { id: data.fuel },
      gearbox: { id: data.gearbox },
      drive: { id: data.drive },
      year: data.year,
      acceleration: data.acceleration,
      pricePerDay: data.pricePerDay,
    },
  };

  return transformed;
}

export default function CarForm(props) {
  const [open, setOpen] = React.useState(false);

  const { jwt } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [currentPhoto, setCurrentPhoto] = React.useState(
    props.car?.attributes.picture.data
      ? props.car.attributes.picture.data.attributes.formats.small.url
      : ""
  );

  const validationSchema = yup.object({
    brand: yup.number().required("Wybierz markę"),
    model: yup.string().required("Wpisz nazwę modelu"),
    description: yup.string().required("Samochód musi posiadać opis"),
    engine: yup.string().required("Wprowadź nazwę silnika"),
    maxSpeed: yup.number().required("Wpisz maksymalną prędkość samochodu"),
    horsePower: yup.number().required("Wpisz ilość konii mechanicznych"),
    fuel: yup.number().required("Wybierz rodzaj paliwa"),
    gearbox: yup.number().required("Wybierz rodzaj skrzyni biegów"),
    drive: yup.number().required("Wybierz rodzaj napędu"),
    year: yup.number().required("Wpisz rok produkcji"),
    acceleration: yup.string().required("Wpisz wartość przyśpieszenia"),
    pricePerDay: yup.number().required("Podaj cenę za dzień"),
  });

  const formik = useFormik({
    initialValues: {
      brand: "",
      model: props.car
        ? props.car.attributes.model.data.attributes.model.data.attributes.brand
            .data.attributes.name +
          " " +
          props.car.attributes.model.data?.attributes.model.data.attributes.name
        : "",
      file: null,
      bodyType: "",
      yearFrom: "",
      yearTo: "",
      description: "",
      engine: "",
      maxSpeed: "",
      horsePower: "",
      fuel: "",
      gearbox: "",
      drive: "",
      year: "",
      acceleration: "",
      pricePerDay: props.car ? props.car.attributes.pricePerDay : 0,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const data = transformForStrapi(values);

      const model = {
        data: {
          name: data.data.model.name,
          brand: { id: values.brand },
          body_type: { id: values.bodyType },
        },
      };

      const modelResponse = await poster("models", model, jwt);

      if (modelResponse.error)
        return alert("Posiadamy juz taki model w ofercie");

      const generation = {
        data: {
          name: data.data.model.name,
          yearFrom: data.data.model.yearFrom,
          yearTo: data.data.model.yearTo,
          model: { id: modelResponse.data.id },
        },
      };

      const generationResponse = await poster("generations", generation, jwt);
      data.data.model = { id: generationResponse.data.id };

      const formData = new FormData();
      formData.append("files", values.file, values.file.name);

      const pictureId = await photoPoster("upload", formData, jwt);
      data.data.picture = { id: pictureId[0].id };

      await poster("cars", data, jwt);

      Router.reload("/cars");
      handleClose();
    },
  });

  return (
    <div>
      <Button variant='contained' size='small' onClick={handleClickOpen}>
        Dodaj
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"lg"}
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>Dodaj nowy samochód</DialogTitle>
          <DialogContent>
            <InputLabel>Marka samochodu</InputLabel>
            <Select
              labelId='brand'
              id='brand-select'
              name='brand'
              error={formik.touched.brand && Boolean(formik.errors.brand)}
              className={`w-full ${
                formik.touched.brand && formik.errors.brand
                  ? "border-red-500"
                  : ""
              }`}
              fullWidth
              value={formik.values.brand}
              onChange={formik.handleChange}
            >
              {props.brands.data.map((brand) => {
                return (
                  <MenuItem key={brand.id} value={brand.id}>
                    {brand.attributes.name}
                  </MenuItem>
                );
              })}
            </Select>
            {formik.touched.brand && formik.errors.brand && (
              <span className='text-red-500'>{formik.errors.brand}</span>
            )}
            <DialogContentText>Model</DialogContentText>
            <TextField
              margin='dense'
              type='text'
              name='model'
              error={formik.touched.model && Boolean(formik.errors.model)}
              className={`${
                formik.touched.model && formik.errors.model
                  ? "border-red-500"
                  : ""
              }`}
              fullWidth
              value={formik.values.model}
              onChange={formik.handleChange}
              variant='outlined'
            />
            {formik.touched.model && formik.errors.model && (
              <span className='text-red-500'>{formik.errors.model}</span>
            )}
            <DialogContentText>Data początku generacji</DialogContentText>
            <TextField
              margin='dense'
              type='text'
              name='yearFrom'
              error={formik.touched.yearFrom && Boolean(formik.errors.yearFrom)}
              className={`${
                formik.touched.yearFrom && formik.errors.yearFrom
                  ? "border-red-500"
                  : ""
              }`}
              fullWidth
              value={formik.values.yearFrom}
              onChange={formik.handleChange}
              variant='outlined'
            />
            {formik.touched.yearFrom && formik.errors.yearFrom && (
              <span className='text-red-500'>{formik.errors.yearFrom}</span>
            )}
            <DialogContentText>Data końca generacji</DialogContentText>
            <TextField
              margin='dense'
              type='text'
              name='yearTo'
              error={formik.touched.yearTo && Boolean(formik.errors.yearTo)}
              className={`${
                formik.touched.yearTo && formik.errors.yearTo
                  ? "border-red-500"
                  : ""
              }`}
              fullWidth
              value={formik.values.yearTo}
              onChange={formik.handleChange}
              variant='outlined'
            />
            {formik.touched.yearTo && formik.errors.yearTo && (
              <span className='text-red-500'>{formik.errors.yearTo}</span>
            )}
            <DialogContentText>Rodzaj nadwozia</DialogContentText>
            <Select
              labelId='bodyType'
              id='brand-select'
              name='bodyType'
              error={formik.touched.bodyType && Boolean(formik.errors.bodyType)}
              className={`w-full ${
                formik.touched.bodyType && formik.errors.bodyType
                  ? "border-red-500"
                  : ""
              }`}
              fullWidth
              value={formik.values.bodyType}
              onChange={formik.handleChange}
            >
              {props.bodyTypes.data.map((bodyType) => {
                return (
                  <MenuItem key={bodyType.id} value={bodyType.id}>
                    {bodyType.attributes.type}
                  </MenuItem>
                );
              })}
            </Select>
            {formik.touched.bodyType && formik.errors.bodyType && (
              <span className='text-red-500'>{formik.errors.bodyType}</span>
            )}
            <DialogContentText className='pb-4'>
              Zdjęcie samochodu
            </DialogContentText>
            {currentPhoto && (
              <Image
                src={currentPhoto}
                alt='zdjecie samochodu'
                width={500}
                height={200}
              ></Image>
            )}
            <Button variant='contained' component='label' className='my-2'>
              Wgraj zdjęcie
              <input
                name='file'
                id='contained-button-file'
                type='file'
                hidden
                onChange={(e) => {
                  const fileReader = new FileReader();
                  fileReader.onload = async () => {
                    if (fileReader.readyState === 2) {
                      await formik.setFieldValue("file", e.target.files[0]);
                      setCurrentPhoto(fileReader.result);
                    }
                  };
                  fileReader.readAsDataURL(e.target.files[0]);
                }}
              />
            </Button>
            <DialogContentText>Opis</DialogContentText>
            <TextField
              margin='dense'
              type='text'
              name='description'
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              className={`w-full ${
                formik.touched.description && formik.errors.description
                  ? "border-red-500"
                  : ""
              }`}
              fullWidth
              value={formik.values.description}
              onChange={formik.handleChange}
              multiline
              rows={3}
              variant='outlined'
            />
            {formik.touched.description && formik.errors.description && (
              <span className='text-red-500'>{formik.errors.description}</span>
            )}
            <DialogContentText>Silnik</DialogContentText>
            <TextField
              margin='dense'
              name='engine'
              type='text'
              error={formik.touched.engine && Boolean(formik.errors.engine)}
              className={`w-full ${
                formik.touched.engine && formik.errors.engine
                  ? "border-red-500"
                  : ""
              }`}
              fullWidth
              value={formik.values.engine}
              onChange={formik.handleChange}
              variant='outlined'
            />
            {formik.touched.engine && formik.errors.engine && (
              <span className='text-red-500'>{formik.errors.engine}</span>
            )}
            <DialogContentText>Maksymalna prędkość</DialogContentText>
            <TextField
              margin='dense'
              name='maxSpeed'
              type='number'
              error={formik.touched.maxSpeed && Boolean(formik.errors.maxSpeed)}
              className={`w-full ${
                formik.touched.maxSpeed && formik.errors.maxSpeed
                  ? "border-red-500"
                  : ""
              }`}
              fullWidth
              value={formik.values.maxSpeed}
              onChange={formik.handleChange}
              variant='outlined'
            />
            {formik.touched.maxSpeed && formik.errors.maxSpeed && (
              <span className='text-red-500'>{formik.errors.maxSpeed}</span>
            )}
            <DialogContentText>Konie mechaniczne</DialogContentText>
            <TextField
              margin='dense'
              name='horsePower'
              type='number'
              error={
                formik.touched.horsePower && Boolean(formik.errors.horsePower)
              }
              className={`w-full ${
                formik.touched.horsePower && formik.errors.horsePower
                  ? "border-red-500"
                  : ""
              }`}
              fullWidth
              value={formik.values.horsePower}
              onChange={formik.handleChange}
              variant='outlined'
            />
            {formik.touched.horsePower && formik.errors.horsePower && (
              <span className='text-red-500'>{formik.errors.horsePower}</span>
            )}
            <InputLabel id='fuel'>Paliwo</InputLabel>
            <Select
              labelId='fuel'
              id='fuel-select'
              name='fuel'
              error={formik.touched.fuel && Boolean(formik.errors.fuel)}
              className={`w-full ${
                formik.touched.fuel && formik.errors.fuel
                  ? "border-red-500"
                  : ""
              }`}
              fullWidth
              value={formik.values.fuel}
              onChange={formik.handleChange}
            >
              <MenuItem key={1} value={1}>
                Benzyna
              </MenuItem>
              <MenuItem key={2} value={2}>
                Diesel
              </MenuItem>
            </Select>
            {formik.touched.fuel && formik.errors.fuel && (
              <span className='text-red-500'>{formik.errors.fuel}</span>
            )}
            <InputLabel id='gearbox'>Skrzynia biegów</InputLabel>
            <Select
              labelId='gearbox'
              id='gearbox-select'
              name='gearbox'
              error={formik.touched.gearbox && Boolean(formik.errors.gearbox)}
              className={`w-full ${
                formik.touched.gearbox && formik.errors.gearbox
                  ? "border-red-500"
                  : ""
              }`}
              fullWidth
              value={formik.values.gearbox}
              onChange={formik.handleChange}
            >
              <MenuItem key={2} value={2}>
                Manualna
              </MenuItem>
              <MenuItem key={3} value={3}>
                Automatyczna
              </MenuItem>
            </Select>
            {formik.touched.gearbox && formik.errors.gearbox && (
              <span className='text-red-500'>{formik.errors.gearbox}</span>
            )}
            <InputLabel id='drive'>Napęd</InputLabel>
            <Select
              labelId='drive'
              id='drive-select'
              name='drive'
              error={formik.touched.drive && Boolean(formik.errors.drive)}
              className={`w-full ${
                formik.touched.drive && formik.errors.drive
                  ? "border-red-500"
                  : ""
              }`}
              fullWidth
              value={formik.values.drive}
              onChange={formik.handleChange}
            >
              <MenuItem key={1} value={1}>
                FWD
              </MenuItem>
              <MenuItem key={2} value={2}>
                RWD
              </MenuItem>
              <MenuItem key={3} value={3}>
                AWD
              </MenuItem>
            </Select>
            {formik.touched.drive && formik.errors.drive && (
              <span className='text-red-500'>{formik.errors.drive}</span>
            )}
            <DialogContentText>Rocznik</DialogContentText>
            <TextField
              margin='dense'
              type='number'
              name='year'
              error={formik.touched.year && Boolean(formik.errors.year)}
              className={`w-full ${
                formik.touched.year && formik.errors.year
                  ? "border-red-500"
                  : ""
              }`}
              fullWidth
              value={formik.values.year}
              onChange={formik.handleChange}
              variant='outlined'
            >
              {/* {availableDates.map((date) => {
              return <MenuItem value={date.id}>{date.date}</MenuItem>;
            })} */}
            </TextField>
            {formik.touched.year && formik.errors.year && (
              <span className='text-red-500'>{formik.errors.year}</span>
            )}
            <DialogContentText>Przyśpieszenie</DialogContentText>
            <TextField
              margin='dense'
              type='number'
              name='acceleration'
              error={
                formik.touched.acceleration &&
                Boolean(formik.errors.acceleration)
              }
              className={`w-full ${
                formik.touched.acceleration && formik.errors.acceleration
                  ? "border-red-500"
                  : ""
              }`}
              fullWidth
              value={formik.values.acceleration}
              onChange={formik.handleChange}
              variant='outlined'
            />
            {formik.touched.acceleration && formik.errors.acceleration && (
              <span className='text-red-500'>{formik.errors.acceleration}</span>
            )}
            <DialogContentText>Cena za dzień</DialogContentText>
            <TextField
              margin='dense'
              type='number'
              name='pricePerDay'
              error={
                formik.touched.pricePerDay && Boolean(formik.errors.pricePerDay)
              }
              className={`w-full ${
                formik.touched.pricePerDay && formik.errors.pricePerDay
                  ? "border-red-500"
                  : ""
              }`}
              fullWidth
              value={formik.values.pricePerDay}
              onChange={formik.handleChange}
              variant='outlined'
            />
            {formik.touched.pricePerDay && formik.errors.pricePerDay && (
              <span className='text-red-500'>{formik.errors.pricePerDay}</span>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                formik.handleReset();
                setCurrentPhoto();
                handleClose();
              }}
            >
              Anuluj
            </Button>
            <Button variant='contained' size='small' type='submit'>
              Dodaj
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export async function getStaticProps(context) {
  const fuelTypes = fetcher("fuels");
  const gearTypes = fetcher("gearboxes");
  const driveTypes = fetcher("drives");

  console.log(fuelTypes);

  return {
    props: {
      fuels: fuelTypes,
      gers: gearTypes,
      drives: driveTypes,
    },
  };
}
