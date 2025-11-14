/**
 * Multi-step progress indicator for pizza builder
 */

interface StepIndicatorProps {
  steps: string[]
  currentStep: number
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-3 md:gap-6 mb-8 md:mb-12">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep
        const isActive = index === currentStep

        return (
          <div key={index} className="flex items-center">
            <div
              className={`
                w-10 h-10 rounded-full flex items-center justify-center font-bold
                transition-all
                ${isActive ? "bg-[#D62828] text-primary-foreground ring-4 ring-primary/30" : ""}
                ${isCompleted ? "bg-[#D62828] text-primary-foreground" : ""}
                ${!isActive && !isCompleted ? "bg-border text-muted-foreground" : ""}
              `}
            >
              {isCompleted ? "✓" : index + 1}
            </div>

            {index < steps.length - 1 && (
              <div
                className={`
                  h-1 w-8 md:w-12 mx-2 transition-all
                  ${isCompleted ? "bg-primary" : "bg-border"}
                `}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
