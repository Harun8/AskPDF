import packageInfo from "@/package.json";
import Link from "next/link";
const Footer = () => {
  let version = packageInfo.version;

  return (
    <section class="bg-zinc-100 dark:bg-gray-800">
      <div class="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
        <nav class="flex flex-wrap justify-center -mx-5 -my-2">
          {/* <div class="px-5 py-2">
            <Link
              href="#"
              class="text-base leading-6 text-gray-500 hover:text-gray-900">
              Release notes
            </Link>
          </div> */}
          <div class="px-5 py-2">
            <Link
              href="/preview"
              class="text-base leading-6 text-gray-500 hover:text-gray-900">
              Preview
            </Link>
          </div>
          <div class="px-5 py-2">
            <Link
              href="/pricing"
              class="text-base leading-6 text-gray-500 hover:text-gray-900">
              Pricing
            </Link>
          </div>

          <div class="px-5 py-2">
            <Link
              href="/faq"
              class="text-base leading-6 text-gray-500 hover:text-gray-900">
              FAQ
            </Link>
          </div>
        </nav>
        <div class="flex justify-center mt-8 space-x-6">
          <Link
            href="https://www.linkedin.com/in/harun-abdi-25aa73164/"
            class="text-gray-400 hover:text-blue-500">
            <span class="sr-only">Linkedin</span>
            <svg
              class="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512">
              <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
            </svg>
          </Link>

          <Link
            href="https://github.com/Harun8/AskPdf"
            class="text-gray-400 hover:text-gray-900">
            <span class="sr-only">GitHub</span>
            <svg
              class="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 24 24">
              <path
                fill-rule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clip-rule="evenodd"></path>
            </svg>
          </Link>
        </div>
        <p class="mt-8 text-base leading-6 text-center font-bold text-red-600">
          © 2024 AskPDF {version}.beta
        </p>
      </div>
    </section>
  );
};

export default Footer;
