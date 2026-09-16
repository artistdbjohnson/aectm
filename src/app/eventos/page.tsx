import type { Metadata } from "next";
import { CalendarView } from "@/components/CalendarView";

export const metadata: Metadata = {
  title: "Eventos / Calendário",
};

export default function Page() {
  return <CalendarView />;
}
