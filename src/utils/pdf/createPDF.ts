import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { TDocumentDefinitions } from "pdfmake/interfaces";
import { TimeLineLayout } from "./daily/Body";
import { DailyPage } from "./daily/DailyPage";
import { OtherTasksLayout } from "./daily/OtherTasks";
import { DailyNotesLayout } from "./dailyNotes/Body";
import { DailyNotesPage } from "./dailyNotes/DailyNotespage";

let pageCount = 1;

async function createPdf() {
  const days = [
    ["Friday", "10", "28"],
    ["Saturday", "10", "29"],
    ["Sunday", "10", "30"],
    ["Monday", "10", "31"],
    ["Tuesday", "11", "1"],
    ["Wednesday", "11", "2"],
    ["Thursday", "11", "3"],
    ["Friday", "11", "4"],
    ["Saturday", "11", "5"],
    ["Sunday", "11", "6"],
  ];
  const pages = [DailyNotesPage()];
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
    })
    .open();
}

export default createPdf;
