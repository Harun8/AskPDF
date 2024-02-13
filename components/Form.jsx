// import React from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";

const Forms = (props) => {
  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Must be a valid email"),

    // password: Yup.string()
    //   .required("No password provided.")
    //   .min(8, "Password is too short - should be 8 chars minimum.")
    //   .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });

  return (
     <>
    <Formik
    initialValues={{ email: "", password: "" }}
    validationSchema={SignupSchema}
    onSubmit={(values) => props.onSubmit(values)}>
      {({ errors, touched }) => (
        <Form className=" dark:bg-gray-900  rounded w-96 px-8 pt-6 pb-8 mb-4 align-middle mt-60 ">
{/*    
              <h1 className="dark:text-white  flex justify-center text-3xl font-bold 		">
            Welcome back 
          </h1> */}
  

          <h1 className="dark:text-white flex justify-center text-3xl font-bold 		">
            {props.title}
          </h1>

          <label
            className=" dark:text-white block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email">
            Email
          </label>
          <Field
            className=" autofill:bg-gray-900 dark:bg-gray-900 dark:text-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
          />
          {errors.email && touched.email ? (
            <div className="text-red-500">{errors.email}</div>
          ) : null}
          {/* <ErrorMessage name="email" component="div" /> */}

          {props.showPassword && (
            <>
              <label
                className=" dark:text-white block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password">
                Password
              </label>
              <Field
                className=" dark:bg-gray-900 dark:text-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
              {errors.password && touched.password ? (
                <div className="text-red-500">{errors.password}</div>
              ) : null}
            </>
          )}

          {/* <ErrorMessage name="password" component="div" /> */}

          {props.title === "Login" && (
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#">
              Forgot Password?
            </a>
          )}

          <div className="flex justify-center mt-5">
            <button
              className=" rounded-lg bg-gray-900 dark:bg-slate-950  dark:text-white text-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={props.isSubmitting}>
              {props.isSubmitting ? "Check your mail" : props.title}
            </button>
          </div>

          <Link
            className=" mt-2 inline-block align-baseline font-bold text-sm text-gray-400 hover:text-text-800"
            href={props.link}>
            {props.redirect}
          </Link>
          {/* .props */}
        </Form>
      )}
    </Formik>  
    </>
  );
};

export default Forms;
