const moment = require("moment");
const fs = require("fs");
const PDFDocument = require("pdfkit");

function createReport(doc, writeStream, data, path) {
  // Embed a font, set the font size, and render some text
  doc.font("fonts/Roboto/Roboto-Light.ttf").fontSize(25);
  doc.text("Resource Management System Report", 20, 10);

  generateChartImage(doc, data);
  generatItemList(doc, data);

  //   generateHeader(doc);
  //   generateCustomerInformation(doc, data);
  //   generateInvoiceTable(doc, data);
  //   generateFooter(doc);

  doc.end();
  doc.pipe(writeStream);
}

function generateChartImage(doc, data) {
  // Add an image, constrain it to a given size, and center it vertically and horizontally
  doc.image(data.dataUrl, 75, 50, { width: 500 });
}

function generatItemList(doc, data) {
  let i;
  const itemListYOffset = 330;

  generateTableRow(
    doc,
    itemListYOffset,
    // "Project",
    "Item Description",
    "Start Date",
    "End Date",
    "Amount"
  );
  generateHr(doc, itemListYOffset + 20);

  data.items.map((item, i) => {
    console.log(item);
    const position = itemListYOffset + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      //   item.title,
      item.description,
      formatDate(item.start_time),
      formatDate(item.end_time),
      item.expense.toString()
    );

    generateHr(doc, position + 20);
  });
}

function generateTableRow(
  doc,
  y,
  //   title,
  description,
  start_time,
  end_time,
  expense
) {
  doc
    .fontSize(10)
    // .text(title, 50, y)
    .text(description, 50, y)
    .text(start_time, 280, y, { width: 90, align: "right" })
    .text(end_time, 370, y, { width: 90, align: "right" })
    .text(expense, 0, y, { align: "right" });
}

function generateHr(doc, y) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

function formatDate(date) {
  return moment(date).format("YYYY/MM/DD");
}

module.exports = {
  createReport,
};
