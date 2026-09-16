import type { Metadata } from "next";
import { AudienceHub } from "@/components/AudienceHub";

export const metadata: Metadata = { title: "Pessoal" };

export default function Page() {
  return <AudienceHub id="pessoal" />;
}
