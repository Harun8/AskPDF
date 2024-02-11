import Image from "next/image";
import Link from "next/link";
import Welcome from "@/public/Welcome.svg";
import { Button } from "@/components/ui/button";

const Success = () => {
  return (
    // <div className=" flex flex-nowrap justify-center bg-white">

    //   <div></div>
    //   <div>1</div>
    // </div>

    <div className="flex justify-center mt-12">
      <div class="grid grid-rows-3 grid-flow-col gap-10">
        <Image className="mx-auto" src={Welcome} alt="Welcome" width={400} height={400}></Image>
        <div>

          <Link className="dark:text-white border rounded" href="/signin ">
            {" "}
            You can now access to your specific AskPDF plan, get started now, by
            creating your account!
          </Link>

          <div className=" mt-6 flex justify-center">

          <Button  size="xlg" variant="homepage">
            Log in with your email now!
          </Button>
        </div>
          </div>

        {/* <div class="row-span-10 ...">
          <Link className="dark:text-white border rounded" href="/signin ">
            {" "}
            You can now access to your specific AskPDF plan, get started now, by
            creating your account!
          </Link>
        </div>
        <div class="col-span-2 ...">
          <p>Send </p>
        </div> */}
      </div>
    </div>
  );
};

export default Success;
