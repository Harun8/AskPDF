import { version } from "@/package.json";
const Footer = () => {
  return (
    <footer class="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
      <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-orange-500 text-4xl text-bold flex justify-center	">
          {" "}
          BETA
        </span>{" "}
        Version: {version}.beta
        {/* <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <a href="https://AskPDF.com/" class="hover:underline mr-5">
            AskPDF{" "}
          </a>
          <span className="text-orange-500	"> BETA</span> Version: {version}
        </span>
        <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#" class="hover:underline me-4 md:me-6">
              About
            </a>
          </li>
          <li>
            <a href="#" class="hover:underline me-4 md:me-6">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" class="hover:underline me-4 md:me-6">
              Licensing
            </a>
          </li>
          <li>
            <a href="#" class="hover:underline">
              Contact
            </a>
          </li>
        </ul> */}
      </div>
    </footer>
  );
};

export default Footer;
