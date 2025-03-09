"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import Faq from "@/components/Faq";

const FaqPage = () => {
  const t = useTranslations();

  return (
    <>
      <title>FaQ | AskPDFs</title>

      <section className="relative z-20 overflow-hidden bg-zinc-100 dark:bg-gray-800 pb-12 pt-20   lg:pb-[90px] lg:pt-[120px]">
      <div className="mx-auto mb-[60px] max-w-[520px] text-center lg:mb-20">
                <span className="mb-2 block text-lg font-bold text-blue-600">
                  {t("Navbar.faq")}
                </span>
                <h2 className="mb-4 text-3xl font-bold text-dark dark:text-white sm:text-[40px]/[48px]">
                  {t("faq.anyQuestions")}
                </h2>
                <p className="text-base text-body-color dark:text-dark-6">
                  {t("faq.bodyText")}

                  <span className="text-blue-600"> support@askpdfs.io</span>
                </p>
              </div>
              <Faq></Faq>

      </section>
    </>
  );
};

export default FaqPage;
