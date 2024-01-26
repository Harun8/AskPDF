export default function Pricing() {
  return (
    <div class="sm:flex sm:flex-col sm:align-center p-10">
      <div class="relative self-center  rounded-lg p-0.5 flex">
        <h2 class="text-xl leading-6 font-bold dark:text-slate-100 text-slate-900">
          Choose one of our incredible options
        </h2>
      </div>
      <div class="mt-12 space-y-3 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 md:max-w-5xl md:mx-auto xl:grid-cols-3">
        <div class=" bg-gray-200 dark:bg-gray-900 	 border border-slate-900 rounded-lg shadow-sm divide-y divide-slate-200">
          <div class="p-6">
            <h2 class="text-xl leading-6 font-bold dark:text-slate-100 text-slate-900">
              Starter
            </h2>
            <p class="mt-2 text-base dark:text-slate-100  text-slate-700 leading-tight">
              For new makers who want to fine-tune and test an idea.
            </p>
            <p class="mt-8">
              <span class="text-4xl font-bold dark:text-slate-100  text-slate-900 tracking-tighter">
                $0
              </span>

              <span class="text-base font-medium dark:text-slate-100  text-slate-500">
                /mo
              </span>
            </p>
            <a
              href="/sign-up"
              class="mt-8 block w-full dark:bg-slate-700 bg-slate-900 rounded-md py-2 text-sm font-semibold text-white text-center">
              Join as a Starter
            </a>
          </div>
          <div class="pt-6 pb-8 px-6">
            <h3 class="text-sm font-bold dark:text-slate-100  text-slate-900 tracking-wide uppercase">
              What's included
            </h3>
            <ul role="list" class="mt-4 space-y-3">
              <li class="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="flex-shrink-0 h-5 w-5 text-green-400"
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
                <span class="text-base dark:text-slate-100  text-slate-700">
                  1 landing page included
                </span>
              </li>
              <li class="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="flex-shrink-0 h-5 w-5 text-green-400"
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
                <span class="text-base dark:text-slate-100  text-slate-700">
                  1,000 visits/mo
                </span>
              </li>
              <li class="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="flex-shrink-0 h-5 w-5 text-green-400"
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
                <span class="text-base dark:text-slate-100  text-slate-700">
                  Access to all UI blocks
                </span>
              </li>
              <li class="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="flex-shrink-0 h-5 w-5 text-green-400"
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
                <span class="text-base dark:text-slate-100  text-slate-700">
                  50 conversion actions included
                </span>
              </li>
              <li class="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="flex-shrink-0 h-5 w-5 text-green-400"
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
                <span class="text-base dark:text-slate-100  text-slate-700">
                  5% payment commission
                </span>
              </li>
              <li class="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="flex-shrink-0 h-5 w-5 text-green-400"
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
                <span class="text-base dark:text-slate-100  text-slate-700">
                  Real-time analytics
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div class=" bg-gray-200 dark:bg-gray-900 	 border border-slate-900 rounded-lg shadow-sm divide-y divide-slate-200">
          <div class="p-6">
            <h2 class="text-xl leading-6 font-bold dark:text-slate-100 text-slate-900">
              Starter
            </h2>
            <p class="mt-2 text-base dark:text-slate-100  text-slate-700 leading-tight">
              For new makers who want to fine-tune and test an idea.
            </p>
            <p class="mt-8">
              <span class="text-4xl font-bold dark:text-slate-100  text-slate-900 tracking-tighter">
                $0
              </span>

              <span class="text-base font-medium dark:text-slate-100  text-slate-500">
                /mo
              </span>
            </p>
            <a
              href="/sign-up"
              class="mt-8 block w-full dark:bg-slate-700 bg-slate-900 rounded-md py-2 text-sm font-semibold text-white text-center">
              Join as a Starter
            </a>
          </div>
          <div class="pt-6 pb-8 px-6">
            <h3 class="text-sm font-bold dark:text-slate-100  text-slate-900 tracking-wide uppercase">
              What's included
            </h3>
            <ul role="list" class="mt-4 space-y-3">
              <li class="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="flex-shrink-0 h-5 w-5 text-green-400"
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
                <span class="text-base dark:text-slate-100  text-slate-700">
                  1 landing page included
                </span>
              </li>
              <li class="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="flex-shrink-0 h-5 w-5 text-green-400"
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
                <span class="text-base dark:text-slate-100  text-slate-700">
                  1,000 visits/mo
                </span>
              </li>
              <li class="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="flex-shrink-0 h-5 w-5 text-green-400"
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
                <span class="text-base dark:text-slate-100  text-slate-700">
                  Access to all UI blocks
                </span>
              </li>
              <li class="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="flex-shrink-0 h-5 w-5 text-green-400"
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
                <span class="text-base dark:text-slate-100  text-slate-700">
                  50 conversion actions included
                </span>
              </li>
              <li class="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="flex-shrink-0 h-5 w-5 text-green-400"
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
                <span class="text-base dark:text-slate-100  text-slate-700">
                  5% payment commission
                </span>
              </li>
              <li class="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="flex-shrink-0 h-5 w-5 text-green-400"
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
                <span class="text-base dark:text-slate-100  text-slate-700">
                  Real-time analytics
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div class=" bg-gray-200 dark:bg-gray-900 	 border border-slate-900 rounded-lg shadow-sm divide-y divide-slate-200">
          <div class="p-6">
            <h2 class="text-xl leading-6 font-bold dark:text-slate-100 text-slate-900">
              Starter
            </h2>
            <p class="mt-2 text-base dark:text-slate-100  text-slate-700 leading-tight">
              For new makers who want to fine-tune and test an idea.
            </p>
            <p class="mt-8">
              <span class="text-4xl font-bold dark:text-slate-100  text-slate-900 tracking-tighter">
                $0
              </span>

              <span class="text-base font-medium dark:text-slate-100  text-slate-500">
                /mo
              </span>
            </p>
            <a
              href="/sign-up"
              class="mt-8 block w-full dark:bg-slate-700 bg-slate-900 rounded-md py-2 text-sm font-semibold text-white text-center">
              Join as a Starter
            </a>
          </div>
          <div class="pt-6 pb-8 px-6">
            <h3 class="text-sm font-bold dark:text-slate-100  text-slate-900 tracking-wide uppercase">
              What's included
            </h3>
            <ul role="list" class="mt-4 space-y-3">
              <li class="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="flex-shrink-0 h-5 w-5 text-green-400"
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
                <span class="text-base dark:text-slate-100  text-slate-700">
                  1 landing page included
                </span>
              </li>
              <li class="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="flex-shrink-0 h-5 w-5 text-green-400"
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
                <span class="text-base dark:text-slate-100  text-slate-700">
                  1,000 visits/mo
                </span>
              </li>
              <li class="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="flex-shrink-0 h-5 w-5 text-green-400"
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
                <span class="text-base dark:text-slate-100  text-slate-700">
                  Access to all UI blocks
                </span>
              </li>
              <li class="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="flex-shrink-0 h-5 w-5 text-green-400"
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
                <span class="text-base dark:text-slate-100  text-slate-700">
                  50 conversion actions included
                </span>
              </li>
              <li class="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="flex-shrink-0 h-5 w-5 text-green-400"
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
                <span class="text-base dark:text-slate-100  text-slate-700">
                  5% payment commission
                </span>
              </li>
              <li class="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="flex-shrink-0 h-5 w-5 text-green-400"
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
                <span class="text-base dark:text-slate-100  text-slate-700">
                  Real-time analytics
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
