import { Content } from "pdfmake/interfaces";

let idCount = 1;

export const Header: (month: string, date: string) => Content = (
  month,
  date
) => {
  return {
    id: `daily header ${idCount++}`,
    columns: [
      {
        width: "auto",
        text: "WEEKS REMAINING IN QUARTER",
      },
      {
        width: "auto",
        text: "13   12   11   10   9   8   7   6   5   4   3   2   1",
      },
      {
        width: "*",
        text: {
          text: `${month}/${date}/2022`,
          alignment: "center",
          fontSize: 8,
        },
      },
    ],
    columnGap: 5,
    fontSize: 4,
    margin: [0, 0, 0, 10],
  };
};
