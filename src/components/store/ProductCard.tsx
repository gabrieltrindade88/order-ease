import { Plus } from "lucide-react";
import type { Product } from "@/data/menu";
import { formatBRL } from "@/lib/format";

type Props = {
  product: Product;
  onClick: () => void;
};

export function ProductCard({ product, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border/70 bg-card text-left shadow-[var(--shadow-card)] transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30"
    >
      <div className="aspect-square w-full overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          width={768}
          height={768}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3 sm:p-4">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground sm:text-base">
          {product.name}
        </h3>
        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {product.description}
        </p>
        <div className="mt-2 flex items-end justify-between">
          <span className="text-base font-bold text-primary">{formatBRL(product.price)}</span>
          <span
            aria-hidden
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-primary-glow)] transition-transform duration-200 group-hover:scale-105"
          >
            <Plus className="h-5 w-5" strokeWidth={2.25} />
          </span>
        </div>
      </div>
    </button>
  );
}
