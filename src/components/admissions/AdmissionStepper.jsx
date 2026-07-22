const defaultSteps = [
  { id: 1, label: "Personal Details" },
  { id: 2, label: "Academic Details" },
  { id: 3, label: "Make Payment" },
]

export default function AdmissionStepper({ currentStep, steps = defaultSteps }) {
  return (
    <div className="mx-auto flex max-w-2xl items-start">
      {steps.map((step, i) => (
        <div key={step.id} className="flex flex-1 items-center last:flex-none">
          <div className="flex flex-col items-center">
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${
                step.id <= currentStep ? "bg-brand-navy" : "bg-slate-400"
              }`}
            >
              {step.id}
            </div>
            <p
              className={`mt-2 whitespace-nowrap text-xs font-semibold ${
                step.id <= currentStep ? "text-brand-navy" : "text-slate-400"
              }`}
            >
              {step.label}
            </p>
          </div>

          {i < steps.length - 1 && (
            <div className={`mt-4.5 h-0.5 flex-1 ${step.id < currentStep ? "bg-brand-navy" : "bg-slate-300"}`} />
          )}
        </div>
      ))}
    </div>
  )
}
