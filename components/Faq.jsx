import React from "react";
import { useTranslations } from "next-intl";

const Faq = () => {
  const t = useTranslations();

  return (
    <div class=" bg-zinc-100">
      <div class="w-full max-w-3xl px-2 mx-auto py-12">
        <h3 class="mt-3 text-2xl font-bold text-gray-800 md:text-2xl  flex justify-center">
          {t("faq.faq")}
        </h3>
        <div class="grid max-w-5xl mx-auto mt-6 divide-y divide-gray-200 ">
          <details class="group py-4">
            <summary class="flex items-center text-black justify-between font-medium list-none cursor-pointer">
              <span>{t("faq.whatIsAskPDF")}</span>
              <span class="transition group-open:rotate-180">
                <svg
                  fill="none"
                  height="24"
                  shape-rendering="geometricPrecision"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  width="24"
                  class=""
                >
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </summary>
            <p class="mt-3 text-black group-open:animate-fadeIn">
              {t("faq.askPDFDescription")}
            </p>
          </details>

          <details class="group py-4">
            <summary class="flex items-center justify-between font-medium list-none cursor-pointer">
              <span>{t("faq.subscriptionDifference")}</span>
              <span class="transition group-open:rotate-180">
                <svg
                  fill="none"
                  height="24"
                  shape-rendering="geometricPrecision"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  width="24"
                  class=""
                >
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </summary>
            <p class="mt-3 text-black group-open:animate-fadeIn ">
              {t("faq.subscriptionDifferenceDescription")}
            </p>
          </details>

          <details class="group py-4">
            <summary class="flex items-center justify-between font-medium list-none cursor-pointer">
              <span>{t("faq.uploadLimit")}</span>
              <span class="transition group-open:rotate-180">
                <svg
                  fill="none"
                  height="24"
                  shape-rendering="geometricPrecision"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  width="24"
                  class=""
                >
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </summary>
            <p class="mt-3 text-black group-open:animate-fadeIn">
              {t("faq.uploadLimitDescription")}
            </p>
          </details>

          <details class="group py-4">
            <summary class="flex items-center justify-between font-medium list-none cursor-pointer">
              <span>{t("faq.fileFormat")}</span>
              <span class="transition group-open:rotate-180">
                <svg
                  fill="none"
                  height="24"
                  shape-rendering="geometricPrecision"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  width="24"
                  class=""
                >
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </summary>
            <p class="mt-3 text-black group-open:animate-fadeIn">
              {t("faq.fileFormatDescription")}
            </p>
          </details>

          <details class="group py-4">
            <summary class="flex items-center justify-between font-medium list-none cursor-pointer">
              <span>{t("faq.dataPrivacy")}</span>
              <span class="transition group-open:rotate-180">
                <svg
                  fill="none"
                  height="24"
                  shape-rendering="geometricPrecision"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  width="24"
                  class=""
                >
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </summary>
            <p class="mt-3 text-black group-open:animate-fadeIn">
              {t("faq.dataPrivacyDescription")}
            </p>
          </details>

          <details class="group py-4">
            <summary class="flex items-center justify-between font-medium list-none cursor-pointer">
              <span>{t("faq.accuracy")}</span>
              <span class="transition group-open:rotate-180">
                <svg
                  fill="none"
                  height="24"
                  shape-rendering="geometricPrecision"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  width="24"
                  class=""
                >
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </summary>
            <p class="mt-3 text-black group-open:animate-fadeIn">
              {t("faq.accuracyDescription")}
            </p>
          </details>
        </div>
      </div>
    </div>
  );
};

export default Faq;
