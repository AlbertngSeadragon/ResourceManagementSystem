import React from "react";
import { sendEchartsImage } from "./services/functions/sendEchartsImage";

function DownloadBtn({ chart }) {
  const canvasToImage = () => {
    let dataURL = chart.getDataURL();
    return dataURL;
  };
  const handleCanvasToImage = async () => {
    const fileUrl = await sendEchartsImage(canvasToImage());
    console.log(fileUrl.data.redirectUrl);
    window.open(fileUrl.data.redirectUrl);
  };

  return (
    <button onClick={handleCanvasToImage} style={{ width: "300px" }}>
      Download PDF
    </button>
  );
}

export default DownloadBtn;
