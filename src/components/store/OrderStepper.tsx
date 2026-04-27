import { CheckCircle2, Clock, Soup, Bike } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: "received", label: "Recebido", Icon: CheckCircle2 },
  { id: "preparing", label: "Preparando", Icon: Soup },
  { id: "delivery", label: "Saiu para entrega", Icon: Bike },
  { id: "delivered", label: "Entregue", Icon: CheckCircle2 },
] as const;

type Props = {
  /** index of the current step (0..3) */
  current: number;
};

export function OrderStepper({ current }: Props) {
  return (
    <ol className="flex items-start justify-between gap-1">
      {STEPS.map((step, idx) => {
        const isDone = idx < current;
        const isActive = idx === current;
        const isFilled = idx <= current;
        const Icon = isDone ? CheckCircle2 : isActive ? Clock : step.Icon;

        return (
          <li key={step.id} className="flex flex-1 flex-col items-center">
            <div className="flex w-full items-center">
              {/* left connector */}
              <div
                className={cn(
                  "h-0.5 flex-1 rounded-full",
                  idx === 0 ? "bg-transparent" : isFilled ? "bg-primary" : "bg-border",
                )}
              />
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                  isFilled
                    ? "border-primary bg-primary text-primary-foreground shadow-[var(--shadow-primary-glow)]"
                    : "border-border bg-card text-muted-foreground",
                )}
              >
                <Icon className="h-5 w-5" strokeWidth={2} />
              </div>
              {/* right connector */}
              <div
                className={cn(
                  "h-0.5 flex-1 rounded-full",
                  idx === STEPS.length - 1
                    ? "bg-transparent"
                    : idx < current
                      ? "bg-primary"
                      : "bg-border",
                )}
              />
            </div>
            <span
              className={cn(
                "mt-2 text-center text-[11px] font-semibold leading-tight sm:text-xs",
                isFilled ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {step.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
