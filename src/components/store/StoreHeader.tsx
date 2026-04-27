import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { useCart, selectCount } from "@/stores/cart";
import logo from "@/assets/logo.png";
import { store } from "@/data/menu";

export function StoreHeader() {
  const count = useCart(selectCount);

  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2.5">
          <img
            src={logo}
            alt={`${store.name} logo`}
            width={36}
            height={36}
            className="h-9 w-9 rounded-full"
          />
          <span className="font-bold tracking-tight text-foreground">{store.name}</span>
        </Link>
        <Link
          to="/cart"
          aria-label={`Abrir carrinho com ${count} itens`}
          className="relative flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-card transition-all duration-200 hover:border-primary/40 hover:shadow-[var(--shadow-soft)]"
        >
          <ShoppingCart className="h-5 w-5 text-foreground" strokeWidth={1.75} />
          {count > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[11px] font-bold text-primary-foreground shadow-[var(--shadow-primary-glow)]">
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
