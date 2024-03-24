"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import Loading from "./loading";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Pricing() {
  const [plans, setPlans] = useState([]);
  const [monthly, setMonthly] = useState(true);
  const [yearly, setYearly] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state added here
  const supabase = createClientComponentClient();

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: session, error } = await supabase.auth.getSession();
      console.log("data", session);
      if (error || session.session === null) {
        console.error("error is ", error);
        return;
      }
      setUserId(session.user.id);
    };

    getUser();
  }, []);

  // const [mont]
  useEffect(() => {
    async function getPrices() {
      try {
        setLoading(true);

        const response = await fetch(`/api/stripe`, {
          method: "GET",
        });

        const data = await response.json();
        setPlans(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getPrices();
  }, []);

  async function onCheckout(planId, plan) {
    // if user is logged in and has a session

    const { data: profile } = await supabase
      .from("profile")
      .select("stripe_customer_id")
      .eq("user_id", userId)
      .single();

    if (profile) {
      const response = await fetch("/api/settings", {
        method: "POST",
        body: JSON.stringify({
          id: userId,
        }),
      });
      const data = await response.json();

      if (data) window.location.href = data.url;
    } else {
      const response = await fetch(`/api/checkout/${planId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // for example, setting Content-Type to application/json
          // ... you can add more headers here if needed
        },
        body: JSON.stringify({
          priceId: planId,
          plan: plan,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY // fine that it is in the client
      );
      await stripe.red;
      await stripe.redirectToCheckout({ sessionId: data.id });
    }
  }

  const monthlyPricing = async () => {
    setMonthly(true);
    setYearly(false);
  };
  const yearlyPricing = async () => {
    setYearly(true);
    setMonthly(false);
  };

  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : (
        <div className="md:flex md:flex-col md:align-center p-10">
          <div className="  relative self-center  rounded-lg p-0.5 flex sm:justify-center">
            <h2 className="lg:text-4xl md:text-4xl text-xl leading-6 font-bold dark:text-slate-400 text-slate-900">
              Choose one of our incredible options
            </h2>
          </div>
          <div className="mt-6 relative self-center flex flex-col md:flex-row md:justify-center">
            <div className="bg-zinc-200 dark:bg-zinc-900 rounded-lg p-0.5  ">
              <button
                onClick={monthlyPricing}
                type="button"
                className={`${`relative w-1/2 rounded-md py-2 text-xs md:text-sm  font-medium whitespace-nowrap 
            focus:outline-none sm:w-auto sm:px-8 ${
              monthly ? "bg-slate-50 dark:bg-slate-800 " : ""
            } border-slate-50 text-slate-900  dark:text-slate-200 shadow-sm`}`}>
                Monthly billing
              </button>
              <button
                onClick={yearlyPricing}
                type="button"
                className={`${`relative w-1/2 rounded-md py-2 text-xs md:text-sm  font-medium whitespace-nowrap 
            focus:outline-none sm:w-auto sm:px-8 ${
              yearly ? "bg-slate-50  dark:bg-slate-800" : ""
            } border-slate-50 text-slate-900 dark:text-slate-200 shadow-sm`}`}>
                Yearly billing
              </button>
            </div>
            <div className="grid justify-items-end md:flex  md:items-center">
              <span className=" bg-green-200 dark:bg-green-900 font-bold rounded-full text-xs px-6  py-2 ml-3">
                save 28%
              </span>
            </div>
          </div>

          <div className="mt-12 space-y-3 md:mt-16 md:space-y-0 md:grid md:grid-cols-3 md:gap-6 md:max-w-5xl md:mx-auto xl:grid-cols-3">
            <div className=" bg-zinc-100 dark:bg-gray-900 	 border border-slate-900 rounded-lg shadow-sm divide-y divide-slate-200">
              <div className="p-6">
                <h2 className="text-xl leading-6 font-bold dark:text-slate-100 text-slate-900">
                  Starter
                </h2>
                <p className="mt-2 text-base dark:text-slate-100  text-slate-700 leading-tight">
                  An always free option designed for casual users to start
                  interacting with a PDF.
                </p>
                <p className="mt-8">
                  <span className="text-4xl font-bold dark:text-slate-100  text-slate-900 tracking-tighter">
                    0 kr
                  </span>

                  <span className="text-base font-medium dark:text-slate-100  text-slate-500">
                    /month
                  </span>
                </p>
                <a
                  href="/signin"
                  className="mt-8 block w-full dark:bg-slate-700 bg-slate-900 rounded-md py-2 text-sm font-semibold text-white text-center">
                  Sign up to get started
                </a>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h3 className="text-sm font-bold dark:text-slate-100  text-slate-900 tracking-wide uppercase">
                  What's included
                </h3>
                <ul role="list" className="mt-4 space-y-3">
                  <li className="flex space-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-shrink-0 h-5 w-5 text-green-400"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M5 12l5 5l10 -10"></path>
                    </svg>
                    <span className="text-base dark:text-slate-100  text-slate-700">
                      1 PDF upload
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-shrink-0 h-5 w-5 text-green-400"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M5 12l5 5l10 -10"></path>
                    </svg>
                    <span className="text-base dark:text-slate-100  text-slate-700">
                      50 monthly questions limit
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-shrink-0 h-5 w-5 text-green-400"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M5 12l5 5l10 -10"></path>
                    </svg>
                    <span className="text-base dark:text-slate-100  text-slate-700">
                      5MB max file limit
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <svg
                      width="20"
                      height="24"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512">
                      <path
                        fill="#ff0000"
                        d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                      />
                    </svg>
                    <span className="text-base dark:text-slate-100  text-slate-700">
                      GPT-4
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <svg
                      width="20"
                      height="24"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512">
                      <path
                        fill="#ff0000"
                        d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                      />
                    </svg>
                    <span className="text-base dark:text-slate-100  text-slate-700">
                      New feature early access
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <svg
                      width="20"
                      height="24"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512">
                      <path
                        fill="#ff0000"
                        d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                      />
                    </svg>
                    <span className="text-base dark:text-slate-100  text-slate-700">
                      Customer support
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className=" bg-sky-100 hover:bg-sky-200 dark:bg-gray-900 shadow-xl  shadow-blue-500		 border border-slate-900 rounded-lg shadow-sm divide-y divide-slate-200">
              <div className="p-6">
                <h2 className="text-xl leading-6 font-bold dark:text-slate-100 text-slate-900">
                  {plans.length > 0 ? plans[2].name : "Premium"}
                  <span className="ml-4 text-xm text-blue-600">
                    {" "}
                    (Most popular){" "}
                  </span>
                </h2>
                <p className="mt-2 text-base dark:text-slate-100  text-slate-700 leading-tight">
                  For users who want's to extract the most out of their PDF's
                  and maximize their PDF interactions.
                </p>
                <p className="mt-8">
                  <span className="text-4xl font-bold dark:text-slate-100  text-slate-900 tracking-tighter">
                    {plans.length > 0 && monthly
                      ? plans[3].price
                      : plans[2].price / 12}
                    kr{" "}
                  </span>

                  <span className="text-base font-medium dark:text-slate-100  text-slate-500">
                    /month
                  </span>
                </p>
                <span className=" flex justify-end text-xs text-muted">
                  {" "}
                  {!monthly ? "billed annually" : ""}
                </span>
                <button
                  onClick={
                    monthly
                      ? () => onCheckout(plans[3].id, plans[3].name)
                      : () => onCheckout(plans[2].id, plans[2].name)
                  }
                  className="  mt-8 block w-full dark:bg-slate-700 bg-slate-900 rounded-md py-2 text-sm font-semibold text-white text-center">
                  Join as a Premium user
                </button>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h3 className="text-sm font-bold dark:text-slate-100  text-slate-900 tracking-wide uppercase">
                  What's included
                </h3>
                <ul role="list" className="mt-4 space-y-3">
                  <li className="flex space-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-shrink-0 h-5 w-5 text-green-400"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M5 12l5 5l10 -10"></path>
                    </svg>
                    <span className="text-base dark:text-slate-100  text-slate-700">
                      50 PDF uploads
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-shrink-0 h-5 w-5 text-green-400"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M5 12l5 5l10 -10"></path>
                    </svg>
                    <span className="text-base dark:text-slate-100  text-slate-700">
                      100 monthly question limit
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-shrink-0 h-5 w-5 text-green-400"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M5 12l5 5l10 -10"></path>
                    </svg>
                    <span className="text-base dark:text-slate-100  text-slate-700">
                      10MB max file limit
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-shrink-0 h-5 w-5 text-green-400"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M5 12l5 5l10 -10"></path>
                    </svg>
                    <span className="text-base dark:text-slate-100  text-slate-700">
                      GPT-4
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <svg
                      width="20"
                      height="24"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512">
                      <path
                        fill="#ff0000"
                        d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                      />
                    </svg>

                    <span className="text-base dark:text-slate-100  text-slate-700">
                      New feature early access
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-shrink-0 h-5 w-5 text-green-400"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M5 12l5 5l10 -10"></path>
                    </svg>
                    <span className="text-base dark:text-slate-100  text-slate-700">
                      Customer support (email)
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className=" bg-zinc-100 dark:bg-gray-900 	 border border-slate-900 rounded-lg shadow-sm divide-y divide-slate-200">
              <div className="p-6">
                <h2 className="text-xl leading-6 font-bold dark:text-slate-100 text-slate-900">
                  {plans.length > 0 ? plans[1].name : "Ultimate"}
                </h2>
                <p className="mt-2 text-base dark:text-slate-100  text-slate-700 leading-tight">
                  Advanced PDF features for professional communication needs,
                  including extensive upload options.
                </p>
                <p className="mt-8">
                  <span className="text-4xl font-bold dark:text-slate-100  text-slate-900 tracking-tighter">
                    {plans.length > 0 && monthly
                      ? plans[1].price
                      : plans[0].price / 12}{" "}
                    kr
                  </span>

                  <span className="text-base font-medium dark:text-slate-100  text-slate-500">
                    /month
                  </span>
                </p>
                <span className=" flex justify-end text-xs text-muted">
                  {" "}
                  {!monthly ? "billed annually" : ""}
                </span>
                <button
                  onClick={
                    monthly
                      ? () => onCheckout(plans[1].id, plans[1].name)
                      : () => onCheckout(plans[0].id, plans[0].name)
                  }
                  className="mt-8 block w-full dark:bg-slate-700 bg-slate-900 rounded-md py-2 text-sm font-semibold text-white text-center">
                  Join as a ultimate user
                </button>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h3 className="text-sm font-bold dark:text-slate-100  text-slate-900 tracking-wide uppercase">
                  What's included
                </h3>
                <ul role="list" className="mt-4 space-y-3">
                  <li className="flex space-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-shrink-0 h-5 w-5 text-green-400"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M5 12l5 5l10 -10"></path>
                    </svg>
                    <span className="text-base dark:text-slate-100  text-slate-700">
                      100 PDF uploads
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-shrink-0 h-5 w-5 text-green-400"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M5 12l5 5l10 -10"></path>
                    </svg>
                    <span className="text-base dark:text-slate-100  text-slate-700">
                      200 monthly question limit
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-shrink-0 h-5 w-5 text-green-400"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M5 12l5 5l10 -10"></path>
                    </svg>
                    <span className="text-base dark:text-slate-100  text-slate-700">
                      50MB max file limit
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-shrink-0 h-5 w-5 text-green-400"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M5 12l5 5l10 -10"></path>
                    </svg>
                    <span className="text-base dark:text-slate-100  text-slate-700">
                      GPT-4
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-shrink-0 h-5 w-5 text-green-400"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M5 12l5 5l10 -10"></path>
                    </svg>
                    <span className="text-base dark:text-slate-100  text-slate-700">
                      New feature early access
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-shrink-0 h-5 w-5 text-green-400"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M5 12l5 5l10 -10"></path>
                    </svg>
                    <span className="text-base dark:text-slate-100  text-slate-700">
                      Customer support (email)
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
