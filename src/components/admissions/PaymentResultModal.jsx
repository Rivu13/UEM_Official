import { AnimatePresence, motion } from "framer-motion"
import { CheckCircle2, XCircle, X } from "lucide-react"

export default function PaymentResultModal({ result, onClose }) {
  const isSuccess = result?.state === "success"

  return (
    <AnimatePresence>
      {result && (
        <motion.div
          key="payment-result-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-brand-navy-dark/70 p-4 backdrop-blur-sm"
        >
          <motion.div
            key="payment-result-panel"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="h-5 w-5" />
            </button>

            <div
              className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${
                isSuccess ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {isSuccess ? (
                <CheckCircle2 className="h-9 w-9 text-green-600" />
              ) : (
                <XCircle className="h-9 w-9 text-red-600" />
              )}
            </div>

            <h2 className="mt-5 text-lg font-extrabold text-brand-navy">
              {isSuccess ? "Payment Successful" : "Payment Failed"}
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {isSuccess
                ? `Your payment has been received and verified. Reference ID: ${result.paymentId}`
                : result?.message || "Something went wrong while processing your payment."}
            </p>

            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full rounded-lg bg-brand-navy py-3 text-sm font-bold text-white transition-colors hover:bg-brand-navy-light"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
