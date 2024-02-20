"use client";
import { SITE_URL } from "@/util/endpoints";
import { stripe } from "@/util/stripe/stripe";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";

export default async function Pricing() {
  useEffect(() => {
    async function getPrices() {
      try {
        const response = await fetch(`/api/stripe`, {
          body: JSON.stringify({
            plan: plan,
            messageText: messageText,
            conv_history: convHistory,
            file_id: currentPdfId,
          }),
        });

        const data = await response.json();
        console.log("prices", data);
      } catch (error) {}
    }
    getPrices();
  }, []);

  async function onCheckout(planId, plan) {
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
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    );
    await stripe.redirectToCheckout({ sessionId: data.id });
  }

  return (
    <div className="sm:flex sm:flex-col sm:align-center p-10">
      <div className="relative self-center  rounded-lg p-0.5 flex">
        <h2 className="text-4xl leading-6 font-bold dark:text-slate-100 text-slate-900">
          Choose one of our incredible options
        </h2>
      </div>
      {/* <div className="mt-6 relative self-center  rounded-lg p-0.5 flex">
        <button
          type="button"
          className="relative w-1/2 rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none sm:w-auto sm:px-8 bg-slate-50 border-slate-50 text-slate-900 shadow-sm">
          Monthly billing
        </button>
        <button
          type="button"
          className="dark:text-white ml-0.5 relative w-1/2 border rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none sm:w-auto sm:px-8 border-transparent text-slate-900">
          Yearly billing
        </button>
      </div> */}

      <div className="mt-12 space-y-3 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 md:max-w-5xl md:mx-auto xl:grid-cols-3">
        <div className=" bg-zinc-100 dark:bg-gray-900 	 border border-slate-900 rounded-lg shadow-sm divide-y divide-slate-200">
          <div className="p-6">
            <h2 className="text-xl leading-6 font-bold dark:text-slate-100 text-slate-900">
              Starter
            </h2>
            <p className="mt-2 text-base dark:text-slate-100  text-slate-700 leading-tight">
              For new makers who want to fine-tune and test an idea. Will always
              be free
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
              href="/sign-up"
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
        <div className=" bg-zinc-100 dark:bg-gray-900  	 border border-slate-900 rounded-lg shadow-sm divide-y divide-slate-200">
          <div className="p-6">
            <h2 className="text-xl leading-6 font-bold dark:text-slate-100 text-slate-900">
              {plans[1].name}
            </h2>
            <p className="mt-2 text-base dark:text-slate-100  text-slate-700 leading-tight">
              For new makers who want to fine-tune and test an idea.
            </p>
            <p className="mt-8">
              <span className="text-4xl font-bold dark:text-slate-100  text-slate-900 tracking-tighter">
                {plans[1].price} kr
              </span>

              <span className="text-base font-medium dark:text-slate-100  text-slate-500">
                /month
              </span>
            </p>
            <button
              onClick={() => onCheckout(plans[1].id, plans[1].name)}
              className="mt-8 block w-full dark:bg-slate-700 bg-slate-900 rounded-md py-2 text-sm font-semibold text-white text-center">
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
        <div className=" bg-zinc-100 dark:bg-gray-900 	 border border-slate-900 rounded-lg shadow-sm divide-y divide-slate-200">
          <div className="p-6">
            <h2 className="text-xl leading-6 font-bold dark:text-slate-100 text-slate-900">
              {plans[0].name}
            </h2>
            <p className="mt-2 text-base dark:text-slate-100  text-slate-700 leading-tight">
              For new makers who want to fine-tune and test an idea.
            </p>
            <p className="mt-8">
              <span className="text-4xl font-bold dark:text-slate-100  text-slate-900 tracking-tighter">
                {plans[0].price} kr
              </span>

              <span className="text-base font-medium dark:text-slate-100  text-slate-500">
                /month
              </span>
            </p>
            <button
              onClick={() => onCheckout(plans[0].id, plans[0].name)}
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
  );
}
