import React from "react";
import { sendPdfData } from "./services/functions/sendPdfData";

function DownloadBtn({ chart, items }) {
  const canvasToImage = () => {
    let dataURL = chart.getDataURL();
    return dataURL;
  };

  const downloadPdf = async () => {
    const fileUrl = await sendPdfData(canvasToImage(), items);
    // console.log(fileUrl.data.redirectUrl);
    window.open(fileUrl.data.redirectUrl);
  };

  return (
    <button onClick={downloadPdf} style={{ width: "300px" }}>
      Download PDF
    </button>
  );
}

export default DownloadBtn;
