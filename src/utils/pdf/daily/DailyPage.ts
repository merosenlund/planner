import { Content } from "pdfmake/interfaces";
import { Body } from "./Body";
import { Header } from "./Header";

export function DailyPage(day: string, month: string, date: string) {
  const page: Content = [Header(month, date), Body(day)];
  return page;
}
