import { Content } from "pdfmake/interfaces";
import { Body } from "./Body";

export function DailyNotesPage() {
  const page: Content = [Body()];
  return page;
}
