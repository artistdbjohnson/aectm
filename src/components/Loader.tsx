"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * OriginKit stagger-text-rise — quiet luxury school loader.
 * Reveals AECTM then full name, dissolves. Never blue WP bars.
 * Reduced-motion → static mark.
 */
export function Loader() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const seen =
      typeof window !== "undefined" &&
      sessionStorage.getItem("aectm-loader") === "1";
    if (seen) {
      setShow(false);
      setDone(true);
      return;
    }
    const t = window.setTimeout(
      () => {
        setDone(true);
        sessionStorage.setItem("aectm-loader", "1");
        window.setTimeout(() => setShow(false), 500);
      },
      reduce ? 400 : 2200,
    );
    return () => window.clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden={done}
          role="status"
          aria-label="AECTM"
        >
          <div className="flex flex-col items-center gap-4 px-6 text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/logo.png"
              alt=""
              className="h-16 w-16 rounded-2xl object-cover shadow-sm"
            />
            {reduce ? (
              <div>
                <p className="text-2xl font-extrabold tracking-tight text-ink">
                  AECTM
                </p>
                <p className="mt-1 text-sm text-muted">
                  Agrupamento de Escolas de Castro Marim
                </p>
              </div>
            ) : (
              <motion.div
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: {
                    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
                  },
                }}
              >
                <motion.p
                  className="text-3xl font-black tracking-tight text-brand sm:text-4xl"
                  variants={{
                    hidden: { opacity: 0, y: 28 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                >
                  AECTM
                </motion.p>
                <motion.p
                  className="mt-2 max-w-sm text-sm font-semibold text-muted sm:text-base"
                  variants={{
                    hidden: { opacity: 0, y: 22 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                >
                  Agrupamento de Escolas de Castro Marim
                </motion.p>
              </motion.div>
            )}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
