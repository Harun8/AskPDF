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
  <label class="custom-file-upload">
    <input className='text-md' onClick={openModal} class="title" type="button" />
    {t("message")}
  </label>
</div>

  )
}

export default PDFUpload