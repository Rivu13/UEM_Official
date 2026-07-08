import { Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function InfoContentPanel({ tab }) {
  return (
    <div className="h-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={tab.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <h3 className="border-b border-slate-100 pb-3 text-lg font-extrabold text-brand-navy sm:text-xl">
            {tab.label}
          </h3>

          <ul className="mt-4 space-y-3">
            {tab.items.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-700"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {tab.notice && (
            <div className="mt-5 rounded-lg border border-amber-300 bg-amber-100/70 p-4 text-sm leading-relaxed text-slate-800">
              
              {tab.notice.intro && (
                <p>{tab.notice.intro}</p>
              )}

              {tab.notice.addresses &&
                tab.notice.addresses.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {tab.notice.addresses.map((addr, i) => (
                      <p key={i}>
                        <span className="font-bold text-brand-navy">
                          {addr.label}:
                        </span>{" "}
                        {addr.text}
                      </p>
                    ))}
                  </div>
                )}

              {tab.notice.disclaimer && (
                <p className="mt-2">
                  {tab.notice.disclaimer}
                </p>
              )}

              {tab.notice.website && (
                <p className="mt-2">
                  Our official website is{" "}
                  <a
                    href={tab.notice.website.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline text-blue-600 hover:text-blue-800"
                  >
                    {tab.notice.website.label}
                  </a>
                </p>
              )}

              {tab.notice.helpline && (
                <p className="mt-2">
                  Helpline:{" "}
                  <span className="font-bold underline">
                    {tab.notice.helpline}
                  </span>
                </p>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}