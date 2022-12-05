import { Column, Content, CustomTableLayout } from "pdfmake/interfaces";
import { Big3Section } from "../daily/DailyBig3";

export const Body: () => Content = () => {
  return [
    {
      text: "Weekly Preview",
      // fontSize: 8,
    },
    StepHeading(
      1,
      "My Biggest Wins",
      "/ List 3-5 major accomplishments from the past week."
    ),
    StepTable(5, ["", ""], ["auto", "*"]),
    StepHeading(2, "After Action Review", "/ Refer to your last Weekly Big 3."),
    {
      columns: [
        {
          text: "How far did you get?",
          italics: true,
          fontSize: 6,
        },
        {
          width: "auto",
          fontSize: 5,
          alignment: "center",
          stack: ["%", "COMPLETE"],
        },
      ],
      margin: [0, 0, 0, 5],
    },
    StepTable(4, ["", "", ""], ["auto", "*", "auto"]),
    {
      text: "What worked what didn't?",
      fontSize: 6,
      italics: true,
      margin: [0, 5],
    },
    StepTable(8, ["", ""], ["auto", "*"]),
    {
      text: "What will you keep, improve, start, or stop doing?",
      fontSize: 6,
      italics: true,
      margin: [0, 5],
    },
    StepTable(8, ["", ""], ["auto", "*"]),
    StepHeading(
      3,
      "List Sweep",
      "/ Process action items and consider next steps."
    ),
    ListSweepTable(),
    StepHeading(
      4,
      "Weekly Overview",
      "/ List important events, deadlines, and tasks in the coming"
    ),
    {
      text: "week. Use weekly view on the next page if helpful.",
      fontSize: 6,
      margin: [0, -3, 0, 5],
    },
    {
      text: "PERSONAL:",
      fontSize: 5,
      margin: [0, 0, 0, 1],
    },
    StepTable(13, [""], ["*"]),
    {
      text: "PROFESSIONAL:",
      fontSize: 5,
      margin: [0, 10, 0, 1],
    },
    StepTable(13, [""], ["*"]),
    WeeklyViewTable(),
    StepHeading(
      5,
      "Weekly Big 3",
      "/ List three objectives to advance your goals and projects this"
    ),
    {
      text: "week.",
      fontSize: 6,
      margin: [0, -3, 0, 5],
    },
    Big3Section("WEEKLY", 235),
    StepHeading(
      6,
      "Self-Care Planner",
      "Brainstorm below, then schedule your rejuvenation on the"
    ),
    {
      text: "Daily Pages.",
      fontSize: 6,
      margin: [0, -3, 0, 5],
    },
    {
      text: "SLEEP:",
      fontSize: 5,
      margin: [0, 0, 0, 1],
    },
    StepTable(2, [""], ["*"]),
    {
      text: "EAT:",
      fontSize: 5,
      margin: [0, 16, 0, 1],
    },
    StepTable(2, [""], ["*"]),
    {
      text: "MOVE:",
      fontSize: 5,
      margin: [0, 16, 0, 1],
    },
    StepTable(2, [""], ["*"]),
    {
      text: "CONNECT:",
      fontSize: 5,
      margin: [0, 16, 0, 1],
    },
    StepTable(2, [""], ["*"]),
    {
      text: "RELAX:",
      fontSize: 5,
      margin: [0, 16, 0, 1],
    },
    StepTable(2, [""], ["*"]),
  ];
};

const StepHeading: (
  stepCount: number,
  stepName: string,
  stepDescription: string
) => Content = (stepCount, stepName, stepDescription) => {
  return {
    columns: [
      {
        width: "auto",
        text: `Step ${stepCount}`,
        bold: true,
        fontSize: 6,
      },
      {
        width: "auto",
        text: stepName.toUpperCase(),
        fontSize: 5,
        bold: true,
        margin: [0, 1, 0, 0],
      },
      {
        text: stepDescription,
        fontSize: 6,
      },
    ],
    columnGap: 5,
    margin: [0, 10, 0, 5],
  };
};

const StepTable: (
  rows: number,
  columns: string[],
  widths: string[]
) => Content = (rows, columns, widths) => {
  const tableBody = [];
  for (let i = 0; i < rows; i++) {
    tableBody.push(columns.slice());
  }
  return {
    layout: "OtherTasksLayout",
    table: {
      headerRows: 0,
      widths,
      body: tableBody,
    },
  };
};

const ListSweepTable: () => Content = () => {
  return {
    layout: "NoBorders",
    table: {
      headerRows: 0,
      widths: ["auto", "auto", "*"],
      body: [
        [
          Circle(),
          "DEFERRED TASKS",
          "Add any Big 3 or Other Tasks you didn't complete to your task manager.",
        ],
        [
          Circle(),
          {
            text: "DELEGATED TASKS",
            // fontSize: 5,
          },
          "Add unassigned task or desired status updates to your task manager.",
        ],
        [
          Circle(),
          "DAILY NOTES",
          "Add any assignments or action items to your task manager.",
        ],
        [Circle(), "GOALS", "Review your annual and/or quarterly goals."],
      ],
    },
    fontSize: 5,
  };
};

const Circle: () => Content = () => {
  return {
    svg: `<svg viewBox="0 0 2 2" xmlns="http://www.w3.org/2000/svg">
                <circle cx="1" cy="1" r=".75" fill="transparent" stroke="black" stroke-width="0.125" />
              </svg>`,
    width: 5,
  };
};

const WeeklyViewTable: () => Content = () => {
  return [
    {
      layout: "WeekViewLayout",
      table: {
        widths: ["*"],
        body: [
          ["Monday"],
          ["Tuesday"],
          ["Wednesday"],
          ["Thursday"],
          ["Friday"],
        ],
      },
      fontSize: 6,
    },
    {
      layout: "WeekendLayout",
      table: {
        widths: ["*", "*"],
        body: [["Saturday", "Sunday"]],
      },
      fontSize: 6,
    },
  ];
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

export const NoBorders: CustomTableLayout = {
  hLineWidth: function (i, node) {
    return 0;
  },
  vLineWidth: function (i, node) {
    return 0;
  },
  paddingLeft: function (i) {
    return i === 0 ? 0 : 8;
  },
  paddingRight: function (i, node) {
    return 0;
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

export const WeekViewLayout: CustomTableLayout = {
  hLineWidth: function (i, node) {
    return 0.25;
  },
  vLineWidth: function (i, node) {
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
    return 53;
  },
};

export const WeekendLayout: CustomTableLayout = {
  hLineWidth: function (i, node) {
    if (i === 0) {
      return 0;
    }
    return 0.25;
  },
  vLineWidth: function (i, node) {
    return 0.25;
  },
  hLineColor: function () {
    return "#aaa";
  },
  vLineColor: function () {
    return "#aaa";
  },
  paddingLeft: function (i) {
    return 4;
  },
  paddingRight: function (i, node) {
    return 8;
  },
  paddingTop: function (i, node) {
    if (node.table.body[i][0].text !== "") {
      return 2;
    }
    return 5;
  },
  paddingBottom: function (i, node) {
    return 53;
  },
};
