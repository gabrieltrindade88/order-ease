import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { useCart, selectCount, selectSubtotal } from "@/stores/cart";
import { formatBRL } from "@/lib/format";

export function StickyCartBar() {
  const count = useCart(selectCount);
  const subtotal = useCart(selectSubtotal);

  if (count === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-4 pb-4 pt-2">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/cart"
          className="pointer-events-auto flex h-14 w-full items-center justify-between rounded-xl bg-primary px-5 text-primary-foreground shadow-[var(--shadow-primary-glow)] transition-all duration-200 hover:bg-primary/90"
        >
          <span className="flex items-center gap-2.5 text-sm font-semibold">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-foreground/15">
              <ShoppingCart className="h-4 w-4" strokeWidth={2} />
            </span>
            Ver carrinho
          </span>
          <span className="text-sm font-bold tabular-nums">
            {count} {count === 1 ? "item" : "itens"} · {formatBRL(subtotal)}
          </span>
        </Link>
      </div>
    </div>
  );
}
