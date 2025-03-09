import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const PricingTable = (props) => {
  const t = useTranslations("pricingPage");

  return (
    <div className="text-gray-700 body-font overflow-hidden border-t border-gray-200">
      <div className="container flex ml-32 px-5 py-14 mx-auto flex flex-wrap">
        <div className="lg:w-1/4 mt-48 hidden lg:block">
          <div className="mt-px border-t border-gray-300 border-b border-l rounded-tl-lg rounded-bl-lg overflow-hidden">
            <p className="bg-gray-300 text-gray-900 h-12 text-center px-4 flex items-center justify-start -mt-px">
              {t("pdfUploads")}
            </p>
            <p className="text-gray-900 h-12 text-center px-4 flex items-center justify-start">
              {t("questionsLimit")}
            </p>
            <p className="bg-gray-300 text-gray-900 h-12 text-center px-4 flex items-center justify-start">
              {t("monthlyQuestionsLimit")}
            </p>
            <p className="text-gray-900 h-12 text-center px-4 flex items-center justify-start">
              {t("fileSizeLimit")}
            </p>
            <p className="bg-gray-300 text-gray-900 h-12 text-center px-4 flex items-center justify-start">
              {t("gpt4")}
            </p>
            <p className="text-gray-900 h-12 text-center px-4 flex items-center justify-start">
              {t("newFeatureEarlyAccess")}
            </p>
            <p className="bg-gray-300 text-gray-900 h-12 text-center px-4 flex items-center justify-start">
              {t("customerSupport")}
            </p>
            {/* <p className="text-gray-900 h-12 text-center px-4 flex items-center justify-start">
              Long Feature Two
            </p>
            <p className="bg-gray-300 text-gray-900 h-12 text-center px-4 flex items-center justify-start">
              Feature One
            </p> */}
          </div>
        </div>
        <div className="flex lg:w-3/4 w-full flex-wrap lg:border border-gray-300 rounded-lg">
          <div className="lg:w-1/3 lg:mt-px w-full mb-10 lg:mb-0 border-2 border-gray-300 lg:border-none rounded-lg lg:rounded-none">
            <div className="px-2 text-center h-48 flex flex-col items-center justify-center">
              <h3 className="tracking-widest">STARTER</h3>
              <h2 className="text-5xl text-gray-900 font-medium leading-none mb-4 mt-2">
                Free
              </h2>
              <span className="text-sm text-gray-600">{t("freeDesc")}</span>
            </div>
            <p className="bg-gray-300 text-gray-600 h-12 text-center px-2 flex items-center -mt-px justify-center border-t border-gray-300">
              1
            </p>
            <p className="text-gray-600 text-center h-12 flex items-center justify-center">
              50
            </p>
            <p className="bg-gray-300 text-gray-600 text-center h-12 flex items-center justify-center">
              <span className="w-5 h-5 inline-flex items-center justify-center bg-indigo-500 text-white rounded-full flex-shrink-0">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                  className="w-3 h-3"
                  viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              </span>
            </p>
            <p className="h-12 text-gray-600 px-6 text-center leading-relaxed flex items-center justify-center">
              5 MB
            </p>
            <p className="bg-gray-300 text-gray-00 text-center h-12 flex items-center justify-center">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.2"
                className="w-5 h-5 text-red-500"
                viewBox="0 0 24 24">
                <path d="M18 6L6 18M6 6l12 12"></path>
              </svg>
            </p>
            <p className="text-gray-600 text-center h-12 flex items-center justify-center">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.2"
                className="w-5 h-5 text-red-500"
                viewBox="0 0 24 24">
                <path d="M18 6L6 18M6 6l12 12"></path>
              </svg>
            </p>
            <p className="bg-gray-300 text-gray-00 text-center h-12 flex items-center justify-center">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.2"
                className="w-5 h-5 text-red-500"
                viewBox="0 0 24 24">
                <path d="M18 6L6 18M6 6l12 12"></path>
              </svg>
            </p>
            {/* <p className="text-gray-600 text-center h-12 flex items-center justify-center">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.2"
                className="w-5 h-5 text-gray-500"
                viewBox="0 0 24 24">
                <path d="M18 6L6 18M6 6l12 12"></path>
              </svg>
            </p>
            <p className="bg-gray-300 text-gray-600 text-center h-12 flex items-center justify-center">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.2"
                className="w-5 h-5 text-gray-500"
                viewBox="0 0 24 24">
                <path d="M18 6L6 18M6 6l12 12"></path>
              </svg>
            </p> */}
            <div className="border-t border-gray-300 p-6 text-center rounded-bl-lg">
              <Link
                href="/signin"
                className="flex items-center text-center mt-auto text-white bg-gray-800 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-900 rounded">
                {t("joinAsAFreeUser")}
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-4 h-4 ml-auto"
                  viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </Link>
              <p className="text-xs text-gray-500 mt-3"></p>
            </div>
          </div>
          <div className="lg:w-1/3 lg:-mt-px w-full mb-10 lg:mb-0 border-2 rounded-lg border-gray-800 relative">
            <span className="bg-gray-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">
              POPULAR
            </span>
            <div className="px-2 text-center h-48 flex flex-col items-center justify-center">
              <h3 className="tracking-widest">PREMIUM</h3>
              <h2 className="text-5xl text-gray-900 font-medium flex items-center justify-center leading-none mb-4 mt-2">
                {props.plans.length > 0 && props.monthly
                  ? props.plans[3].price
                  : props.plans[2].price / 12}
                kr <span className="text-gray-600 text-base ml-1">/mo</span>
              </h2>
              <span className="text-sm text-gray-600">{t("proDesc")}</span>
              <span className="text-sm text-gray-600">
                {!props.monthly ? "billed annually" : ""}
              </span>
            </div>
            <p className="bg-gray-300 text-gray-600 h-12 text-center px-2 flex items-center -mt-px justify-center border-t border-gray-300">
              50
            </p>
            <p className=" text-gray-600 h-12 text-center px-2 flex items-center -mt-px justify-center border-t border-gray-300">
              100
            </p>
            <p className="bg-gray-300 text-gray-600 text-center h-12 flex items-center justify-center">
              <span className="w-5 h-5 inline-flex items-center justify-center bg-indigo-500 text-white rounded-full flex-shrink-0">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                  className="w-3 h-3"
                  viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              </span>
            </p>
            <p className="h-12 text-gray-600 text-center leading-relaxed flex items-center justify-center">
              10 MB
            </p>
            <p className="bg-gray-300 text-gray-600 text-center h-12 flex items-center justify-center">
              <span className="w-5 h-5 inline-flex items-center justify-center bg-indigo-500 text-white rounded-full flex-shrink-0">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                  className="w-3 h-3"
                  viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              </span>
            </p>
            <p className="text-gray-600 text-center h-12 flex items-center justify-center">
              <span className="w-5 h-5 inline-flex items-center justify-center  text-white rounded-full flex-shrink-0">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2.2"
                  className="w-5 h-5 text-red-500"
                  viewBox="0 0 24 24">
                  <path d="M18 6L6 18M6 6l12 12"></path>
                </svg>
              </span>
            </p>
            <p className="bg-gray-300 text-gray-600 text-center h-12 flex items-center justify-center">
              <span className="w-5 h-5 inline-flex items-center justify-center bg-indigo-500 text-white rounded-full flex-shrink-0">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                  className="w-3 h-3"
                  viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              </span>
            </p>
            {/* <p className="text-gray-600 text-center h-12 flex items-center justify-center">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.2"
                className="w-5 h-5 text-gray-500"
                viewBox="0 0 24 24">
                <path d="M18 6L6 18M6 6l12 12"></path>
              </svg>
            </p>
            <p className="bg-gray-300 text-gray-600 text-center h-12 flex items-center justify-center">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.2"
                className="w-5 h-5 text-gray-500"
                viewBox="0 0 24 24">
                <path d="M18 6L6 18M6 6l12 12"></path>
              </svg>
            </p> */}
            <div className="p-6 text-center border-t border-gray-300">
              <button
                onClick={
                  props.monthly
                    ? () =>
                        props.onCheckout(props.plans[3].id, props.plans[3].name)
                    : () =>
                        props.onCheckout(props.plans[2].id, props.plans[2].name)
                }
                className="flex items-center mt-auto text-white bg-gray-800 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-900 rounded">
                {t("joinAsPremiumUser")}

                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-4 h-4 ml-auto"
                  viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
              <p className="text-xs text-gray-500 mt-3"></p>
            </div>
          </div>
          <div className="lg:w-1/3 w-full lg:mt-px border-2 border-gray-300 lg:border-none rounded-lg lg:rounded-none">
            <div className="px-2 text-center h-48 flex flex-col items-center justify-center">
              <h3 className="tracking-widest">ULTIMATE</h3>
              <h2 className="text-5xl text-gray-900 font-medium flex items-center justify-center leading-none mb-4 mt-2">
                {props.plans.length > 0 && props.monthly
                  ? props.plans[1].price
                  : props.plans[0].price / 12}{" "}
                kr
                <span className="text-gray-600 text-base ml-1">/mo</span>
              </h2>
              <span className="text-sm text-gray-600">{t("ultimateDesc")}</span>

              <span className="text-sm text-gray-600">
                {" "}
                {!props.monthly ? "billed annually" : ""}
              </span>
            </div>
            <p className="bg-gray-300 text-gray-600 h-12 text-center px-2 flex items-center -mt-px justify-center border-t border-gray-300">
              Unlimited
            </p>
            <p className=" text-gray-600 h-12 text-center px-2 flex items-center -mt-px justify-center border-t border-gray-300">
              200
            </p>
            <p className="bg-gray-300 text-gray-600 text-center h-12 flex items-center justify-center">
              <span className="w-5 h-5 inline-flex items-center justify-center bg-indigo-500 text-white rounded-full flex-shrink-0">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                  className="w-3 h-3"
                  viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              </span>
            </p>
            <p className="h-12 text-gray-600 text-center leading-relaxed flex items-center justify-center">
              50 MB
            </p>
            <p className="bg-gray-300 text-gray-600 text-center h-12 flex items-center justify-center">
              <span className="w-5 h-5 inline-flex items-center justify-center bg-indigo-500 text-white rounded-full flex-shrink-0">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                  className="w-3 h-3"
                  viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              </span>
            </p>
            <p className="text-gray-600 text-center h-12 flex items-center justify-center">
              <span className="w-5 h-5 inline-flex items-center justify-center bg-indigo-500 text-white rounded-full flex-shrink-0">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                  className="w-3 h-3"
                  viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              </span>
            </p>
            <p className="bg-gray-300 text-gray-600 text-center h-12 flex items-center justify-center">
              <span className="w-5 h-5 inline-flex items-center justify-center bg-indigo-500 text-white rounded-full flex-shrink-0">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                  className="w-3 h-3"
                  viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              </span>
            </p>
            {/* <p className="text-gray-600 text-center h-12 flex items-center justify-center">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.2"
                className="w-5 h-5 text-gray-500"
                viewBox="0 0 24 24">
                <path d="M18 6L6 18M6 6l12 12"></path>
              </svg>
            </p>
            <p className="bg-gray-300 text-gray-600 text-center h-12 flex items-center justify-center">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.2"
                className="w-5 h-5 text-gray-500"
                viewBox="0 0 24 24">
                <path d="M18 6L6 18M6 6l12 12"></path>
              </svg>
            </p> */}
            <div className="p-6 text-center border-t border-gray-300">
              <button
                onClick={
                  props.monthly
                    ? () => onCheckout(props.plans[1].id, props.plans[1].name)
                    : () => onCheckout(props.plans[0].id, props.plans[0].name)
                }
                className="flex items-center mt-auto text-white bg-gray-800 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-900 rounded">
                {t("joinAsUltimateUser")}
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-4 h-4 ml-auto"
                  viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
              <p className="text-xs text-gray-500 mt-3"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingTable;
