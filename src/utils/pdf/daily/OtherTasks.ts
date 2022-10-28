import { Content, CustomTableLayout } from "pdfmake/interfaces";

export const OtherTasksLayout: CustomTableLayout = {
  hLineWidth: function () {
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
    return 5;
  },
  paddingBottom: function (i, node) {
    return 5;
  },
};

export const OtherTasksSection: () => Content = () => {
  const tableBody = [];
  for (let i = 0; i < 19; i++) {
    tableBody.push(["", "", ""]);
  }
  return {
    stack: [
      {
        text: "OTHER TASKS",
        fontSize: "6",
        margin: [0, 5, 0, 5],
        bold: true,
      },
      {
        layout: "OtherTasksLayout",
        table: {
          headerRows: 0,
          widths: ["auto", "auto", "*"],

          body: tableBody,
        },
      },
    ],
    margin: [0, 0, 15, 0],
  };
};
