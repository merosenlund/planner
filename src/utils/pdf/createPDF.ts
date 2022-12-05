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
  const days: [string, string, string][] = [
    ["Monday", "12", "5"],
    ["Tuesday", "12", "6"],
    ["Wednesday", "12", "7"],
    ["Thursday", "12", "8"],
    ["Friday", "12", "9"],
    ["Saturday", "12", "10"],
    ["Sunday", "12", "11"],
    ["Monday", "12", "12"],
    ["Tuesday", "12", "13"],
    ["Wednesday", "12", "14"],
    ["Thursday", "12", "15"],
    ["Friday", "12", "16"],
    ["Saturday", "12", "17"],
    ["Sunday", "12", "18"],
    ["Monday", "12", "19"],
    ["Tuesday", "12", "20"],
    ["Wednesday", "12", "21"],
    ["Thursday", "12", "22"],
    ["Friday", "12", "23"],
    ["Saturday", "12", "24"],
    ["Sunday", "12", "25"],
    ["Monday", "12", "26"],
    ["Tuesday", "12", "27"],
    ["Wednesday", "12", "28"],
    ["Thursday", "12", "29"],
    ["Friday", "12", "30"],
    ["Saturday", "12", "31"],
  ];
  const pages = [DailyNotesPage(), WeeklyPreview("11", "20")];
  for (const day of days) {
    pages.push(DailyPage(day[0], day[1], day[2]));
    pages.push(DailyNotesPage());
    if (day[0] === "Sunday") {
      pages.push(WeeklyPreview(day[1], day[2]));
    }
  }
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
