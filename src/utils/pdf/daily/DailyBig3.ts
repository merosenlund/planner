import { Content } from "pdfmake/interfaces";

export const DailyBig3Section: () => Content = () => {
  return [
    {
      columns: [
        {
          width: "auto",
          text: "DAILY BIG 3",
          margin: [0, 0, 5, 0],
          bold: true,
        },
        "List your 3 most important tasks",
      ],
      fontSize: 6,
      margin: [0, 5, 0, 0],
    },
    DailyBig3SectionDivider(),
    DailyBig3(),
    DailyBig3SectionDivider(),
    DailyBig3(),
    DailyBig3SectionDivider(),
    DailyBig3(),
    DailyBig3SectionDivider(),
  ];
};

const DailyBig3: () => Content = () => {
  return {
    columns: [
      {
        svg: `<svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
              <circle cx="5" cy="5" r="4" fill="transparent" stroke="black" stroke-width="0.5" />
            </svg>`,
        width: 10,
      },
      {
        canvas: [
          {
            type: "line",
            x1: 0,
            x2: 130,
            y1: 0,
            y2: 0,
            lineWidth: 0.125,
            lineColor: "#aaa",
          },
          {
            type: "line",
            x1: 0,
            x2: 130,
            y1: 10,
            y2: 10,
            lineWidth: 0.125,
            lineColor: "#aaa",
          },
        ],
      },
    ],
    columnGap: 10,
  };
};

const DailyBig3SectionDivider: () => Content = () => {
  return {
    canvas: [
      {
        type: "line",
        x1: 0,
        x2: 150,
        y1: 0,
        y2: 0,
        lineWidth: 0.25,
      },
    ],
    margin: [0, 10],
  };
};