import { Content } from "pdfmake/interfaces";
import { Body } from "./Body";
import { Header } from "../Header";

export function WeeklyPreview(month: string, date: string) {
  const page: Content = [Header(month, date), Body()];
  return page;
}
