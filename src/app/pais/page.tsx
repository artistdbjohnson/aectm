import type { Metadata } from "next";
import { AudienceHub } from "@/components/AudienceHub";

export const metadata: Metadata = { title: "Pais e encarregados de educação" };

export default function Page() {
  return <AudienceHub id="pais" />;
}
