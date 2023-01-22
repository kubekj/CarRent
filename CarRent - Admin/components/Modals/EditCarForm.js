import React from "react";

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
import { photoPoster, putter } from "lib/rest-api";

function EditCarForm(props) {
  const [currentPhoto, setCurrentPhoto] = React.useState(
    props.car.attributes.picture.data.attributes.formats.small.url
  );

  const [open, setOpen] = React.useState(false);

  const { jwt } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validationSchema = yup.object({
    // file: yup.object().required("Wgraj plik ze zdjęciem"),
    pricePerDay: yup.number().required("Podaj cenę za dzień"),
  });

  const formik = useFormik({
    initialValues: {
      model:
        props.car.attributes.model.data.attributes.model.data.attributes.brand
          .data.attributes.name +
        " " +
        props.car.attributes.model.data?.attributes.model.data.attributes.name,
      file: null,
      pricePerDay: props.car.attributes.pricePerDay,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const data = {
        data: {
          pricePerDay: values.pricePerDay,
        },
      };

      const formData = new FormData();
      formData.append("files", values.file, values.file.name);

      const pictureId = await photoPoster("upload", formData, jwt);
      data.data.picture = { id: pictureId[0].id };

      await putter(`cars/${props.car.id}`, data, jwt);

      Router.reload("/cars");
      handleClose();
    },
  });

  return (
    <div>
      <Button
        variant='contained'
        color={"warning"}
        size='small'
        onClick={handleClickOpen}
      >
        Edytuj
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"lg"}
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>Edytuj</DialogTitle>
          <DialogContent>
            <DialogContentText>Samochód</DialogContentText>
            <TextField
              margin='dense'
              type='text'
              name='model'
              fullWidth
              value={formik.values.model}
              variant='outlined'
              disabled
            />
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
                handleClose();
              }}
            >
              Anuluj
            </Button>
            <Button variant='contained' size='small' type='submit'>
              Edytuj
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default EditCarForm;
