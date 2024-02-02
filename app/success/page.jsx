import Link from "next/link";

const Success = () => {
  return (
    // <div className=" flex flex-nowrap justify-center bg-white">

    //   <div></div>
    //   <div>1</div>
    // </div>

    <div className="flex justify-center">
      <div class="grid grid-rows-3 grid-flow-col gap-10">
        <div class="row-span-10 ...">
          <Link className="dark:text-white border rounded" href="/signin ">
            {" "}
            You can now access to your specific AskPDF plan, get started now, by
            creating your account!
          </Link>
        </div>
        <div class="col-span-2 ...">
          <p>Send </p>
        </div>
      </div>
    </div>
  );
};

export default Success;
