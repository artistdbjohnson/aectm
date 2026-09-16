import type { Metadata } from "next";
import { ContactsView } from "@/components/ContactsView";

export const metadata: Metadata = {
  title: "Contactos",
};

export default function Page() {
  return <ContactsView />;
}
