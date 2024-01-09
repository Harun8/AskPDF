import fs from "fs";
import pdf from "pdf-parse";
import { promisify } from "util";
const readFileAsync = promisify(fs.readFile);

export default async function handler(req, res) {
  console.log("REQ", req);
  if (req.method === "POST") {
    const data = await req.formData();
    const file = data.get("file");
    if (!file) {
      return res
        .status(400)
        .json({ success: false, message: "No file provided" });
    }
    try {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const pdfData = await pdf(buffer);

      console.log({
        numpages: pdfData.numpages,
        numrender: pdfData.numrender,
        info: pdfData.info,
        metadata: pdfData.metadata,
        version: pdfData.version,
        text: pdfData.text,
      });

      res.status(200).json({ message: "PDF processed", text: pdfData.text });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export { handler as POST };
