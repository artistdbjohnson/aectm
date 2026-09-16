import type { Metadata } from "next";
import { AudienceHub } from "@/components/AudienceHub";

export const metadata: Metadata = { title: "Alunos" };

export default function Page() {
  return <AudienceHub id="alunos" />;
}
