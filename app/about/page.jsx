export default async function Unauthenticated() {
  return (
    <div className="mt-32 relative self-center rounded-lg p-0.5 flex flex-col sm:justify-center">
      <div className="text-3xl font-serif font-bold leading-tight flex justify-center">
        <span>
          {" "}
          What is <span className="text-blue-600"> AskPDF?</span>{" "}
        </span>
        <br />
      </div>

      <div className="text-3xl font-serif font-bold leading-tight flex justify-center">
        <span>
          {" "}
          Why should you use
          <span className="text-blue-600"> AskPDF?</span>
        </span>
      </div>

      {/* 
      
      <div className="text-3xl font-serif font-bold leading-tight flex justify-center">
        <span>
          {" "}
          Want to know why I made this
          <span className="text-blue-600"> AskPDF?</span>
        </span>
      </div> */}
    </div>
  );
}
