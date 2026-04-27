import { categories } from "@/data/menu";
import { cn } from "@/lib/utils";

type Props = {
  active: string;
  onChange: (id: string) => void;
};

export function CategoryTabs({ active, onChange }: Props) {
  return (
    <div className="sticky top-16 z-20 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto max-w-5xl px-4">
        <nav
          aria-label="Categorias do menu"
          className="-mx-1 flex gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {categories.map((c) => {
            const isActive = c.id === active;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => onChange(c.id)}
                aria-pressed={isActive}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-[var(--shadow-primary-glow)]"
                    : "border border-border/70 bg-card text-muted-foreground hover:text-foreground",
                )}
              >
                {c.name}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
