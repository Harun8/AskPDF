// import React from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import "@/public/styles/form.css";
import { useTranslations } from "next-intl";

export type FormValues = {
  email: string;
  password: string;
};
export type Credentials = {
  title: string;
  showPassword: boolean;
  isSubmitting: boolean;
  link: string;
  redirect: string;
  // email: string;
  // password: string;
  onSubmit: (values: FormValues) => void;
};

const Forms = (props: Credentials) => {
  const t = useTranslations();

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
          <Form className=" dark:bg-gray-800  rounded w-96 px-8 pt-6 pb-8 mb-4 align-middle mt-60 ">
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
              data-testid="email-field"
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
                  {t("faq.password")}
                </label>
                <Field
                  className=" dark:bg-gray-900 dark:text-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="password"
                  name="password"
                  id="password"
                  placeholder={t("faq.password")}
                  data-testid="password-field"
                />
                {errors.password && touched.password ? (
                  <div className="text-red-500">{errors.password}</div>
                ) : null}
              </>
            )}
            {/* <ErrorMessage name="password" component="div" /> */}

            {/* {props.title === "Login" && (
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#">
              Forgot Password?
            </a>
          )} */}

            <div className="flex flex-col mt-5">
              <button
                className={`${`rounded-lg dark:bg-slate-950  
                dark:text-white text-black text-white ${
                  props.isSubmitting
                    ? "bg-blue-600 hover:bg-blue-800"
                    : "bg-gray-900 hover:bg-gray-700  "
                }
                 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}`}
                type="submit"
                disabled={props.isSubmitting}
                data-testid="login-btn">
                {props.isSubmitting ? "Check your mail" : props.title}
              </button>
              <hr className="mt-6"></hr>
              {/* <div class="buttons-container">
                <div class="apple-login-button">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    class="apple-icon"
                    viewBox="0 0 1024 1024"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M747.4 535.7c-.4-68.2 30.5-119.6 92.9-157.5-34.9-50-87.7-77.5-157.3-82.8-65.9-5.2-138 38.4-164.4 38.4-27.9 0-91.7-36.6-141.9-36.6C273.1 298.8 163 379.8 163 544.6c0 48.7 8.9 99 26.7 150.8 23.8 68.2 109.6 235.3 199.1 232.6 46.8-1.1 79.9-33.2 140.8-33.2 59.1 0 89.7 33.2 141.9 33.2 90.3-1.3 167.9-153.2 190.5-221.6-121.1-57.1-114.6-167.2-114.6-170.7zm-105.1-305c50.7-60.2 46.1-115 44.6-134.7-44.8 2.6-96.6 30.5-126.1 64.8-32.5 36.8-51.6 82.3-47.5 133.6 48.4 3.7 92.6-21.2 129-63.7z"></path>
                  </svg>
                  <span> {props.title} with Apple</span>
                </div>
                <div class="google-login-button">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    version="1.1"
                    x="0px"
                    y="0px"
                    class="google-icon"
                    viewBox="0 0 48 48"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill="#FFC107"
                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
	c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                    <path
                      fill="#FF3D00"
                      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                    <path
                      fill="#4CAF50"
                      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                    <path
                      fill="#1976D2"
                      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                  </svg>
                  <span>{props.title} with Google</span>
                </div>
              </div> */}
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
