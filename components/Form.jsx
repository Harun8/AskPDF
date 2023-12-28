import React from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";

const Forms = (props) => {
  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Must be a valid email"),
    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });

  return (
    <div className="flex justify-center ">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={SignupSchema}
        // validate={(values) => {
        //   const errors = {};
        //   if (!values.email) {
        //     errors.email = ""; //used to be Required
        //   } else if (
        //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        //   ) {
        //     errors.email = "Invalid email address";
        //   }
        //   return errors;
        //}}

        onSubmit={(values) => props.onSubmit(values)}

        // onSubmit={(values, { setSubmitting }) => {
        //   console.log("yo");
        //   setTimeout(() => {
        //     alert(JSON.stringify(values, null, 2));
        //     setSubmitting(false);
        //   }, 400);
        // }}
      >
        {({ errors, touched }) => (
          <Form className=" dark:bg-gray-900 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 align-middle mt-60 ">
            <h1 className="dark:text-gray-400 flex justify-center text-3xl font-bold		">
              {props.title}
            </h1>

            <label
              class=" dark:text-white block text-gray-700 text-sm font-bold mb-2"
              for="email">
              Email
            </label>
            <Field
              className=" dark:bg-gray-700 dark:text-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
            />
            {errors.email && touched.email ? (
              <div className="text-red-500">{errors.email}</div>
            ) : null}
            {/* <ErrorMessage name="email" component="div" /> */}

            <label
              class=" dark:text-white block text-gray-700 text-sm font-bold mb-2"
              for="password">
              Password
            </label>
            <Field
              className=" dark:bg-gray-700 dark:text-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
            {errors.password && touched.password ? (
              <div className="text-red-500">{errors.password}</div>
            ) : null}

            {/* <ErrorMessage name="password" component="div" /> */}

            {props.title === "Login" && (
              <a
                class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="#">
                Forgot Password?
              </a>
            )}

            <div class="flex justify-center mt-5">
              <button
                class=" rounded-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                // disabled={isSubmitting}
              >
                {props.title}
              </button>
            </div>

            <Link
              class=" mt-2 inline-block align-baseline font-bold text-sm text-gray-400 hover:text-text-800"
              href={props.link}>
              {props.redirect}
            </Link>
            {/* .props */}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Forms;
