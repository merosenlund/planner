import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { TDocumentDefinitions } from "pdfmake/interfaces";
import { TimeLineLayout } from "./daily/Body";
import { DailyPage } from "./daily/DailyPage";
import { OtherTasksLayout } from "./daily/OtherTasks";
import { DailyNotesLayout } from "./dailyNotes/Body";
import { DailyNotesPage } from "./dailyNotes/DailyNotespage";
import { NoBorders, WeekViewLayout, WeekendLayout } from "./weeklyPreview/Body";
import { WeeklyPreview } from "./weeklyPreview/WeeklyPreview";

let pageCount = 1;

async function createPdf(startDate: string, endDate: string) {
  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]

  /**
   * Notes on printing. Print even pages first. Then print odd pages by inserting the pages back in the printer after flipping them short wise.
   * (Top of the printed page should be face up and closer to you)
   */

  const monthLength = 9

  const month = "1"

  let dayNum = 2

  const pages = [DailyNotesPage(), WeeklyPreview("1", "1")];

  while (dayNum <= monthLength) {
    for (const day of weekDays) {
      pages.push(DailyPage(day, month, `${dayNum}`));
      pages.push(DailyNotesPage());
      if (day === "Sunday") {
        pages.push(WeeklyPreview(month, `${dayNum}`));
      }
      dayNum += 1;
      if (dayNum > monthLength) {
        break;
      }
    }
  }

  // const days: [string, string, string][] = [
  //   ["Sunday", "1", "1"],
  //   ["Monday", "1", "2"],
  //   ["Tuesday", "1", "3"],
  //   ["Thursday", "1", "4"],
  //   ["Friday", "1", "5"],
  //   ["Tuesday", "1", "6"],
  //   ["Saturday", "1", "7"],
  //   ["Sunday", "1", "8"],
  //   ["Monday", "1", "9"],
  //   ["Tuesday", "1", "10"],
  //   ["Wednesday", "1", "11"],
  //   ["Friday", "1", "12"],
  //   ["Saturday", "1", "13"],
  //   ["Sunday", "1", "14"],
  //   ["Thursday", "1", "15"],
  //   ["Friday", "1", "16"],
  //   ["Saturday", "1", "17"],
  //   ["Sunday", "1", "18"],
  //   ["Monday", "1", "19"],
  //   ["Tuesday", "1", "20"],
  //   ["Wednesday", "1", "21"],
  //   ["Thursday", "1", "22"],
  //   ["Friday", "1", "23"],
  //   ["Saturday", "1", "24"],
  //   ["Sunday", "1", "25"],
  //   ["Monday", "1", "26"],
  //   ["Tuesday", "1", "27"],
  //   ["Wednesday", "1", "28"],
  //   ["Thursday", "1", "29"],
  //   ["Friday", "1", "30"],
  //   ["Saturday", "1", "31"],
  // ];

  // for (const day of days) {
  //   pages.push(DailyPage(day[0], day[1], day[2]));
  //   pages.push(DailyNotesPage());
  //   if (day[0] === "Sunday") {
  //     pages.push(WeeklyPreview(day[1], day[2]));
  //   }
  // }

  const docDefinition: TDocumentDefinitions = {
    pageSize: "A6",
    content: pages,
    pageMargins: [30, 20, 30, 20],
    pageBreakBefore: (currentNode) => {
      if (currentNode.id) {
        if (currentNode.text === "NOTES" && pageCount === 1) {
          pageCount++;
          return false;
        }
        return true;
      }
      return false;
    },
  };
  pdfMake
    .createPdf(docDefinition, {
      OtherTasksLayout,
      TimeLineLayout,
      DailyNotesLayout,
      NoBorders,
      WeekViewLayout,
      WeekendLayout,
    })
    .open();
}

export default createPdf;
