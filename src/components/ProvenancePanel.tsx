"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, X } from "lucide-react";
import { useLocale } from "@/content/locale";
import { chrome } from "@/content/data";

export function ProvenancePanel({
  title,
  items,
}: {
  title: string;
  items: { label: string; href?: string; note?: string }[];
}) {
  const [open, setOpen] = useState(false);
  const { locale } = useLocale();
  const c = chrome(locale);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-semibold uppercase tracking-[1px] text-muted hover:border-brand hover:text-brand"
      >
        <FileText size={14} /> {c.provenance}
      </button>
      <AnimatePresence>
        {open ? (
          <motion.aside
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-line bg-surface shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <div>
                <p className="chrome-label">{c.provenance}</p>
                <p className="font-semibold">{title}</p>
              </div>
              <button
                type="button"
                className="rounded-full border border-line p-2"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
            <ul className="flex-1 space-y-3 overflow-y-auto px-5 py-5">
              {items.map((item, i) => (
                <li key={i} className="rounded-xl border border-line bg-bg p-3">
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-brand hover:underline"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <p className="font-semibold">{item.label}</p>
                  )}
                  {item.note ? (
                    <p className="mt-1 text-sm text-muted">{item.note}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </>
  );
}
