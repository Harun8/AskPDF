import React from 'react'
import "../public/styles/pdfUpload.css"
import { useTranslations } from "next-intl";

const PDFUpload = ({openModal}) => {
      const t = useTranslations("chat");
    
  return (
    
<div class="container">
  <div class="folder">
    <div class="top"></div>
    <div class="bottom"></div>
  </div>
  <label class="custom-file-upload  hover:bg-zinc-200 dark:hover:bg-zinc-800">
    <input  onClick={openModal} class="title text-md text-black dark:text-white" type="button" />
    {t("message")}
  </label>
</div>

  )
}

export default PDFUpload