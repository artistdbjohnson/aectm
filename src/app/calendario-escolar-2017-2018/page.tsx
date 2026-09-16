import type { Metadata } from "next";
import { CalendarView } from "@/components/CalendarView";

export const metadata: Metadata = {
  title: "Calendário Escolar 2026-2027",
};

export default function Page() {
  return <CalendarView />;
}
