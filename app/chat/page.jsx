"use client";
import { Document, Page } from "react-pdf";
// import pdf from ".../public/pdf";
import { pdfjs } from "react-pdf";
import pdf from "@/public/pdf.pdf";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
export default function chat() {
  const pdfURL = "/pdf.pdf";
  return (
    <div>
      <Document file={pdfURL}>
        <Page pageNumber={2} />
      </Document>
    </div>
  );
}
