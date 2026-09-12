"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * Motionsites quiet tonal loader — school-stripped.
 * Crest + wordmark + thin 000→100 progress. No bounce, no marketing cycle, no WP blue bars.
 * prefers-reduced-motion → static mark then skip.
 */
export function Loader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("aectm-loader") === "1") {
        setShow(false);
        return;
      }
    } catch {
      /* ignore */
    }

    if (reduce) {
      const t = window.setTimeout(() => {
        setShow(false);
        try {
          sessionStorage.setItem("aectm-loader", "1");
        } catch {
          /* ignore */
        }
      }, 350);
      return () => window.clearTimeout(t);
    }

    const start = performance.now();
    const dur = 1600;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(100, Math.round(((now - start) / dur) * 100));
      setProgress(p);
      if (p < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => {
          setShow(false);
          try {
            sessionStorage.setItem("aectm-loader", "1");
          } catch {
            /* ignore */
          }
        }, 220);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: "var(--a-loader-bg, var(--a-bg))" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          role="status"
          aria-label="AECTM"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <motion.div
            className="flex flex-col items-center gap-5 px-6 text-center"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/logo.png"
              alt=""
              className="h-[72px] w-[72px] rounded-2xl object-cover"
            />
            <div>
              <p className="text-[28px] font-medium tracking-tight text-ink">
                AECTM
              </p>
              <p className="mt-1 max-w-[260px] text-[13px] font-normal leading-snug text-muted">
                Agrupamento de Escolas de Castro Marim
              </p>
            </div>
            <div className="mt-2 h-[2px] w-40 overflow-hidden rounded-full bg-line">
              <div
                className="h-full bg-ink"
                style={{
                  width: `${reduce ? 100 : progress}%`,
                  transition: reduce ? "none" : "width 80ms linear",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
