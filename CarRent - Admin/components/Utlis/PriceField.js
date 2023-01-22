import React, { useEffect } from "react";

import { useFormikContext } from "formik";

import TextField from "@mui/material/TextField";

export default function PriceField(props) {
  const {
    values: { dateFrom, dateTo },
    touched,
    setFieldValue,
  } = useFormikContext();

  useEffect(() => {
    if (touched.dateFrom && touched.dateTo)
      setFieldValue(
        props.name,
        Math.round(
          Math.abs(((firstDate - secondDate) / 24) * 60 * 60 * 1000) *
            props.price
        )
      );
  }, [
    dateFrom,
    dateTo,
    touched.dateFrom,
    touched.dateTo,
    setFieldValue,
    props.name,
    props.price,
  ]);

  return (
    <TextField
      id='price'
      name='price'
      type='number'
      fullWidth
      value={currentPrice}
      onChange={formik.handleChange}
      disabled
    />
  );
}
