import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartItem } from "@/stores/cart";
import { useCart } from "@/stores/cart";
import { formatBRL } from "@/lib/format";

export function CartLineItem({ item }: { item: CartItem }) {
  const updateQuantity = useCart((s) => s.updateQuantity);
  const removeItem = useCart((s) => s.removeItem);
  const subtotal = item.product.price * item.quantity;

  return (
    <article className="flex gap-3 rounded-xl border border-border/70 bg-card p-3 shadow-[var(--shadow-card)]">
      <img
        src={item.product.image}
        alt={item.product.name}
        width={96}
        height={96}
        loading="lazy"
        className="h-20 w-20 shrink-0 rounded-lg object-cover sm:h-24 sm:w-24"
      />
      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold leading-snug text-foreground sm:text-base">
            {item.product.name}
          </h3>
          <button
            type="button"
            onClick={() => removeItem(item.product.id)}
            aria-label={`Remover ${item.product.name}`}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        {item.notes && (
          <p className="mt-0.5 line-clamp-1 text-xs italic text-muted-foreground">
            “{item.notes}”
          </p>
        )}
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-center gap-1 rounded-full border border-border/70 bg-secondary/60 p-0.5">
            <button
              type="button"
              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
              aria-label="Diminuir"
              className="flex h-8 w-8 items-center justify-center rounded-full text-foreground transition-colors hover:bg-card"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-6 text-center text-sm font-bold tabular-nums">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
              aria-label="Aumentar"
              className="flex h-8 w-8 items-center justify-center rounded-full text-foreground transition-colors hover:bg-card"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <span className="text-sm font-bold text-primary">{formatBRL(subtotal)}</span>
        </div>
      </div>
    </article>
  );
}
