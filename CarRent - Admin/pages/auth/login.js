import React, { useState } from "react";

// layout for page
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

import Auth from "layouts/Auth.js";
import fetcher from "lib/rest-api";
import { setToken } from "lib/auth";
import { useFetchUser } from "lib/authContext";

import { getSession, signIn } from "next-auth/react";
import Router from "next/router";

const validationSchema = Yup.object().shape({
  identifier: Yup.string().required(
    "Musisz podać nazwę uzytkownika zeby się zalogować"
  ),
  password: Yup.string().required("Musisz podać hasło zeby się zalogować"),
});

export default function Login({ session }) {
  if (session) Router.replace("/");

  const [data, setData] = useState({
    identifier: "",
    password: "",
  });

  const { user, loading } = useFetchUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jwt = await fetcher("/auth/local", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: data.identifier,
        password: data.password,
      }),
    });
    setToken(jwt);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className='container mx-auto px-4 h-full'>
        <div className='flex content-center items-center justify-center h-full'>
          <div className='w-full lg:w-4/12 px-4'>
            <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0'>
              <div className='rounded-t mb-0 px-6 py-6'></div>
              <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
                <Formik
                  validationSchema={validationSchema}
                  initialValues={{ identifier: "", password: "" }}
                  onSubmit={async (values) => {
                    const result = await signIn("credentials", {
                      redirect: false,
                      identifier: values.identifier,
                      password: values.password,
                    });

                    if (!result.ok)
                      return alert("wprowadzono nieprawidłowe dane");
                    Router.replace("/");
                  }}
                >
                  {({ values, errors, touched, handleChange }) => (
                    <Form>
                      <div className='relative w-full mb-3'>
                        <label
                          className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                          htmlFor='grid-password'
                        >
                          Nazwa Uzytkownika
                        </label>
                        <Field
                          type='text'
                          name='identifier'
                          className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                          placeholder='Nazwa Uzytkownika'
                          onChange={handleChange}
                          value={values.identifier}
                        />
                        <p className='pt-2 text-red-500'>
                          {errors.identifier &&
                            touched.identifier &&
                            errors.identifier}
                        </p>
                      </div>

                      <div className='relative w-full mb-3'>
                        <label
                          className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                          htmlFor='grid-password'
                        >
                          Hasło
                        </label>
                        <Field
                          type='password'
                          name='password'
                          className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                          placeholder='Password'
                          onChange={handleChange}
                          value={values.password}
                        />
                        <p className='pt-2 text-red-500'>
                          {errors.password &&
                            touched.password &&
                            errors.password}
                        </p>
                      </div>

                      <div className='text-center mt-6'>
                        <button
                          className='bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150'
                          type='submit'
                        >
                          Zaloguj się
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        pernament: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

Login.layout = Auth;
