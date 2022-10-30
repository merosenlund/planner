import { Column, Content, CustomTableLayout } from "pdfmake/interfaces";
import { DailyBig3Section } from "./DailyBig3";
import { OtherTasksSection } from "./OtherTasks";

const leftColumn: (day: string) => Column = (day) => {
  return {
    width: "70%",
    stack: [day, DailyBig3Section(150), OtherTasksSection()],
  };
};

const rightColumn: () => Column = () => {
  return {
    width: "30%",
    stack: [
      Ritual("Morning Ritual", [0, 0, 0, 2]),
      Ritual("Workday Startup Ritual", [0, 2, 0, 2]),
      Ritual("Workday Shutdown Ritual", [0, 2, 0, 2]),
      Ritual("Evening Ritual", [0, 2, 0, 5]),
      TimeLine(),
    ],
  };
};

const TimeLine: () => Content = () => {
  const hours = [
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
  ];
  const tableBody = [];
  for (let i = 0; i < hours.length; i++) {
    tableBody.push([hours[i], "", ""]);
    tableBody.push(["", "", ""]);
  }
  return {
    layout: "TimeLineLayout",
    table: {
      headerRows: 0,
      widths: ["auto", "auto", "*"],

      body: tableBody,
    },
    fontSize: 4,
  };
};

const Ritual: (
  ritual: string,
  margin: [number, number, number, number]
) => Content = (ritual, margin) => {
  return {
    columns: [
      {
        svg: `<svg viewBox="0 0 2 2" xmlns="http://www.w3.org/2000/svg">
                <circle cx="1" cy="1" r=".75" fill="transparent" stroke="black" stroke-width="0.125" />
              </svg>`,
        width: 5,
      },
      {
        width: "*",
        text: {
          text: ritual.toUpperCase(),
          fontSize: 4,
        },
      },
    ],
    columnGap: 5,
    margin: margin,
  };
};

export const Body: (day: string) => Content = (day) => {
  return {
    columns: [leftColumn(day), rightColumn()],
    // columnGap: 15,
  };
};

export const TimeLineLayout: CustomTableLayout = {
  hLineWidth: function (i, node) {
    if (i === 0) {
      return 0;
    }
    return 0.25;
  },
  vLineWidth: function (i, node) {
    return 0;
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
