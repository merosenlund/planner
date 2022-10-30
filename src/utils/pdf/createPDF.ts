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

async function createPdf(startDate, endDate) {
  const days: [string, string, string][] = [
    ["Monday", "11", "7"],
    ["Tuesday", "11", "8"],
    ["Wednesday", "11", "9"],
    ["Thursday", "11", "10"],
    ["Friday", "11", "11"],
    ["Saturday", "11", "12"],
    ["Sunday", "11", "13"],
  ];
  const pages = [DailyNotesPage(), WeeklyPreview("11", "6")];
  for (const day of days) {
    pages.push(DailyPage(day[0], day[1], day[2]));
    pages.push(DailyNotesPage());
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
