"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import Loading from "./loading";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import PricingTable from "@/components/PricingTable";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { useQuery } from "@tanstack/react-query";

export default function Pricing() {
  const [plans, setPlans] = useState([]);
  const [prices, setPrices] = useState([]);
  const [monthly, setMonthly] = useState(true);
  const [locale, setLocale] = useState("da");
  const supabase = createClientComponentClient();

  const [userId, setUserId] = useState(null);

  const t = useTranslations("pricingPage");
  const lng = useLocale();

  useEffect(() => {
    setLocale(lng);
  }, [lng]);

  useEffect(() => {
    const getUser = async () => {
      const { data: session, error } = await supabase.auth.getSession();
      if (error || session.session === null) {
        // console.error("error is ", error);
        return;
      }
      console.log("session", session);

      console.log("session", session.user.id);
      setUserId(session.user.id);
    };

    getUser();
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ["stripe"],
    queryFn: async () => {
      const response = await fetch(`/api/stripe`, { method: "GET" });
      const data = await response.json();
      return data;
    },
    staleTime: Infinity, // <--- here!
    cacheTime: Infinity, // <--- here!
  });

  useEffect(() => {
    if (data) {
      setPrices(data);
      setPlans(data);
    }
  }, [data]);

  // useEffect(() => {
  //   async function getPrices() {

  //     try {
  //       setLoading(true);

  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setLoading(false);

  //     }
  //   }
  //   getPrices();
  // }, []);

  useEffect(() => {
    if (plans.length > 0) {
      const { premium, ultimate } = renderPrices(prices); // Pass `plans` as an argument
      setPlans([premium, ultimate]); // Update with filtered values
    }
  }, [prices, monthly, locale]); // Use only relevant dependencies

  const renderPrices = (plans) => {
    if (monthly) {
      const premium =
        locale == "da"
          ? plans.find((price) => price.nickname === "premium_dkk_month")
          : plans.find((price) => price.nickname === "premium_usd_month");
      const ultimate =
        locale == "da"
          ? plans.find((price) => price.nickname === "ultimate_dkk_month")
          : plans.find((price) => price.nickname === "ultimate_usd_month");
      return { premium, ultimate };
    } else {
      const premium =
        locale == "da"
          ? plans.find((price) => price.nickname === "premium_dkk_year")
          : plans.find((price) => price.nickname === "premium_usd_year");
      const ultimate =
        locale == "da"
          ? plans.find((price) => price.nickname === "ultimate_dkk_year")
          : plans.find((price) => price.nickname === "ultimate_usd_year");
      return { premium, ultimate };
    }
  };

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

  // const monthlyPricing = async () => {
  //   setMonthly((prev) => !prev);
  //   // setYearly(false);
  // };

  // forhindre i automatisk ændring af button, hvis man doubleklikker på yearly eller monthly buttons
  const monthlyPricing = async () => {
    setMonthly(true);
};

const yearlyPricing = async () => {
    setMonthly(false);
};
  // const yearlyPricing = async () => {
  //   // setYearly(true);
  //   setMonthly(false);
  // };

  return (
    <>
      <title>Pricing | AskPDFs</title>

      {isLoading ? (
        <Loading></Loading>
      ) : (
        // <PricingTable
        //   plans={plans}
        //   monthly={monthly}
        //   onCheckout={onCheckout}></PricingTable>

        <div className="md:flex md:flex-col md:align-center p-10">
          <div className="  relative self-center  rounded-lg p-0.5 flex sm:justify-center">
            <h2 className="lg:text-4xl md:text-4xl text-xl leading-6 font-bold dark:text-slate-400 text-slate-900">
              {t("title")}
            </h2>
          </div>
         <div className="flex items-center justify-center mt-4 space-x-4">
  <div className="inline-flex rounded-md bg-zinc-200 dark:bg-zinc-900 p-0.5">
    <button
      onClick={monthlyPricing}
      className={`w-fit text-center rounded-md py-2 px-10 text-xs md:text-sm font-medium focus:outline-none ${
        monthly
          ? "bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200"
          : "text-slate-500 dark:text-slate-500"
      }`}
    >
      {t("monthly")}
    </button>
    <button
      onClick={yearlyPricing}
      className={`w-fit text-center rounded-md py-2 px-10 text-xs md:text-sm font-medium focus:outline-none ${
        !monthly
          ? "bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200"
          : "text-slate-500 dark:text-slate-500"
      }`}
    >
      {t("yearly")}
    </button>
  </div>
  <span className="bg-stone-400 dark:bg-green-900 font-bold rounded-full text-xs px-6 py-2">
    {t("save")} 28%
  </span>
</div>

{/* /* <div className="grid justify-items-end md:flex  md:items-center"> */}
{/* <span className="ml-4 bg-stone-400 dark:bg-green-900 font-bold rounded-full text-xs px-6 py-2">
{t("save")} 28%
</span>
{/* <span className="mt-12 space-y-3 md:mt-16 md:space-y-0 md:grid md:grid-cols-3 md:gap-6 md:max-w-5xl md:mx-auto xl:grid-cols-3">


</span> */}

          <div className="mt-12 space-y-3 md:mt-16 md:space-y-0 md:grid md:grid-cols-3 md:gap-6 md:max-w-5xl md:mx-auto xl:grid-cols-3">
            <div
              data-testid="cypress-FreePlan"
              className=" bg-stone-200 dark:bg-gray-900 	 border  rounded-3xl shadow-sm divide-y divide-slate-200"
            >

              <div className="p-6">
                <h2 className="text-xl leading-6 font-bold dark:text-slate-100 text-slate-900">
                  Starter
                </h2>
                <p className="mt-2 text-base dark:text-slate-100  text-slate-700 leading-tight">
                  {t("freeDesc")}
                </p>
                <p className="mt-8">
                  <span className="text-4xl font-bold dark:text-slate-100  text-slate-900 tracking-tighter">
                    0{t("currency")}
                  </span>

                  <span className="text-base font-medium dark:text-slate-100  text-slate-500">
                    /{t("month")}
                  </span>

                  <Link
                    data-testid="cypress-freeTierBtn"
                    href="/signin"
                    className="mt-8 block w-full dark:bg-slate-700 bg-stone-600 rounded-md py-2 text-sm font-semibold text-white text-center"
                  >
                    {t("joinAsAFreeUser")}
                  </Link>
                </p>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h3 className="text-sm font-bold dark:text-slate-100  text-slate-900 tracking-wide uppercase">
                  {t("incl")}
                </h3>
                <ul role="list" className="mt-4 space-y-3">
                  <li className="flex space-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                      />
                    </svg>

                    <span className="text-base dark:text-slate-100  text-slate-700">
                      1 {t("pdfUpload")}
                    </span>
                  </li>

                  <li className="flex space-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                      />
                    </svg>

                    <span className="text-base dark:text-slate-100  text-slate-700">
                      5MB {t("fileSizeLimit")}
                    </span>
                  </li>
                  {/* <li className="flex space-x-3">
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
                      {t("newFeatureEarlyAccess")}
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
                      {t("customerSupport")}
                    </span>
                  </li> */}
                </ul>
              </div>
            </div>

            <div className=" bg-stone-300 dark:bg-gray-900 	 border  rounded-3xl shadow-sm divide-y divide-slate-200">
              <div className="p-6">
                <h2 className="text-xl leading-6 font-bold dark:text-slate-100 text-slate-900">
                  Premium
                  <span className="ml-4 text-xl text-gray-900 font-bold ">
                    {" "}
                    ({t("mostPopular")})
                  </span>
                </h2>
                <p className="mt-2 text-base dark:text-slate-100  text-slate-700 leading-tight">
                  {t("proDesc")}
                </p>
                <p className="mt-8">
                  <span className="text-4xl font-bold dark:text-slate-100  text-slate-900 tracking-tighter">
                    {plans.length > 0 && monthly ? (
                      <NumberTicker
                        value={parseFloat(plans[0]?.price).toFixed(0)}
                        duration={10}
                        // direction="down"
                        // startValue={50}
                        format={(value) => parseFloat(value).toFixed(0)}
                      ></NumberTicker>
                    ) : (
                      <NumberTicker
                        value={(parseFloat(plans[0]?.price) / 12).toFixed(0)}
                        duration={10}
                        format={(value) => parseFloat(value).toFixed(0)}
                      >
                        {" "}
                      </NumberTicker>
                    )}

                    {t("currency")}
                  </span>

                  <span className="text-base font-medium dark:text-slate-100  text-slate-500">
                    /{t("month")}
                  </span>
                </p>
                <span className=" flex justify-end text-xs text-muted">
                  {" "}
                  {!monthly ? t("billedAnually") : ""}
                </span>
                <button
                  onClick={
                    monthly
                      ? () => onCheckout(plans[0].id, plans[0].name)
                      : () => onCheckout(plans[0].id, plans[0].name)
                  }
                  className="  mt-8 block w-full dark:bg-slate-700 bg-stone-600 rounded-md py-2 text-sm font-semibold text-white text-center"
                >
                  {t("joinAsPremiumUser")}
                </button>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h3 className="text-sm font-bold dark:text-slate-100  text-slate-900 tracking-wide uppercase">
                  {t("incl")}
                </h3>
                <ul role="list" className="mt-4 space-y-3">
                  <li className="flex space-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                      />
                    </svg>

                    <span className="text-base dark:text-slate-100  text-slate-700">
                      50 {t("pdfUploads")}
                    </span>
                  </li>

                  <li className="flex space-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                      />
                    </svg>

                    <span className="text-base dark:text-slate-100  text-slate-700">
                      10MB {t("fileSizeLimit")}
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                      />
                    </svg>

                    <span className="text-base dark:text-slate-100  text-slate-700">
                      GPT-4
                    </span>
                  </li>
                  {/* <li className="flex space-x-3">
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
                      {t("newFeatureEarlyAccess")}
                    </span>
                  </li> */}
                  <li className="flex space-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                      />
                    </svg>

                    <span className="text-base dark:text-slate-100  text-slate-700">
                      {t("customerSupport")} (email)
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className=" bg-stone-200 dark:bg-gray-900 	 border  rounded-3xl shadow-sm divide-y divide-slate-200">
              <div className="p-6">
                <h2 className="text-xl leading-6 font-bold dark:text-slate-100 text-slate-900">
                  Ultimate
                </h2>
                <p className="mt-2 text-base dark:text-slate-100  text-slate-700 leading-tight">
                  {t("ultimateDesc")}
                </p>
                <p className="mt-8">
                  <span className="text-4xl font-bold dark:text-slate-100  text-slate-900 tracking-tighter">
                    {plans.length > 0 && monthly ? (
                      <NumberTicker
                        value={parseFloat(plans[1]?.price).toFixed(0)}
                        duration={10}
                        format={(value) => parseFloat(value).toFixed(0)}
                      ></NumberTicker>
                    ) : (
                      <NumberTicker
                        value={(parseFloat(plans[1]?.price) / 12).toFixed(0)}
                        duration={10}
                        format={(value) => parseFloat(value).toFixed(0)}
                      >
                        {" "}
                      </NumberTicker>
                    )}
                    {t("currency")}
                  </span>

                  <span className="text-base font-medium dark:text-slate-100  text-slate-500">
                    /{t("month")}
                  </span>
                </p>
                <span className=" flex justify-end text-xs text-muted">
                  {" "}
                  {!monthly ? t("billedAnually") : ""}
                </span>
                <button
                  onClick={
                    monthly
                      ? () => onCheckout(plans[1].id, plans[1].name)
                      : () => onCheckout(plans[1].id, plans[1].name)
                  }
                  className="mt-8 block w-full dark:bg-slate-700 bg-stone-600 rounded-md py-2 text-sm font-semibold text-white text-center"
                >
                  {t("joinAsUltimateUser")}
                </button>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h3 className="text-sm font-bold dark:text-slate-100  text-slate-900 tracking-wide uppercase">
                  {t("incl")}
                </h3>
                <ul role="list" className="mt-4 space-y-3">
                  <li className="flex space-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                      />
                    </svg>

                    <span className="text-base dark:text-slate-100  text-slate-700">
                      {t("unlimited")}
                    </span>
                  </li>

                  <li className="flex space-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                      />
                    </svg>

                    <span className="text-base dark:text-slate-100  text-slate-700">
                      50MB {t("fileSizeLimit")}
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                      />
                    </svg>

                    <span className="text-base dark:text-slate-100  text-slate-700">
                      GPT-4
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                      />
                    </svg>

                    <span className="text-base dark:text-slate-100  text-slate-700">
                      {t("newFeatureEarlyAccess")}
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                      />
                    </svg>

                    <span className="text-base dark:text-slate-100  text-slate-700">
                      {t("customerSupport")} (email)
                    </span>
                  </li>
                  {/* <li className="flex space-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                      />
                    </svg>

                    <span className="text-base dark:text-slate-100  text-slate-700">
                      Google docs integration
                    </span>
                  </li> */}
                  <li className="flex space-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                      />
                    </svg>

                    <span className="text-base dark:text-slate-100  text-slate-700">
                      {t("enhance")}
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
