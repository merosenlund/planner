import {
  CanvasElement,
  Column,
  Content,
  CustomTableLayout,
} from "pdfmake/interfaces";

let idCount = 1;

export const Body: () => Content = () => {
  const tableBody = [];
  for (let i = 0; i < 35; i++) {
    tableBody.push(["", "", ""]);
  }
  return [
    {
      id: `daily notes header ${idCount++}`,
      text: "NOTES",
      fontSize: 6,
      bold: true,
      margin: [0, 0, 0, 10],
    },
    {
      layout: "DailyNotesLayout",
      table: {
        headerRows: 0,
        widths: ["auto", "*", "auto"],
        body: tableBody,
      },
    },
  ];
};

export const DailyNotesLayout: CustomTableLayout = {
  hLineWidth: function (i, node) {
    return 0.25;
  },
  vLineWidth: function (i, node) {
    if (i === 0 || i === node.table.body[0]?.length) {
      return 0;
    }
    return 0.25;
  },
  hLineColor: function () {
    return "#aaa";
  },
  vLineColor: function () {
    return "#aaa";
  },
  paddingLeft: function (i) {
    return i === 0 ? 4 : 8;
  },
  paddingRight: function (i, node) {
    return i === node.table.widths.length - 1 ? 20 : 8;
  },
  paddingTop: function (i, node) {
    if (node.table.body[i][0].text !== "") {
      return 2;
    }
    return 5;
  },
  paddingBottom: function (i, node) {
    if (node.table.body[i][0].text !== "") {
      console.log("returning zero");
      return 2;
    }
    return 5;
  },
};
