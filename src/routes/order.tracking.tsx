import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, MapPin, Phone } from "lucide-react";
import { StoreHeader } from "@/components/store/StoreHeader";
import { OrderStepper } from "@/components/store/OrderStepper";
import { products, store } from "@/data/menu";
import { formatBRL } from "@/lib/format";

export const Route = createFileRoute("/order/tracking")({
  head: () => ({
    meta: [
      { title: "Acompanhe seu pedido — Cantina Verde" },
      { name: "description", content: "Acompanhe em tempo real o status da sua entrega." },
      { property: "og:title", content: "Acompanhe seu pedido — Cantina Verde" },
      { property: "og:description", content: "Acompanhe em tempo real o status da sua entrega." },
    ],
  }),
  component: TrackingPage,
});

// Demo summary — fixed sample so the page is meaningful even after cart is cleared.
const DEMO_ITEMS = [
  { product: products.find((p) => p.id === "pizza")!, quantity: 1 },
  { product: products.find((p) => p.id === "salad")!, quantity: 1 },
  { product: products.find((p) => p.id === "lemonade")!, quantity: 2 },
];

function TrackingPage() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= 3) return;
    const t = setTimeout(() => setStep((s) => s + 1), 6000);
    return () => clearTimeout(t);
  }, [step]);

  const subtotal = DEMO_ITEMS.reduce((acc, i) => acc + i.product.price * i.quantity, 0);
  const total = subtotal + store.deliveryFee;

  const eta =
    step === 0
      ? "Chega em 35–45 min"
      : step === 1
        ? "Chega em 25–35 min"
        : step === 2
          ? "Chega em 10–15 min"
          : "Pedido entregue";

  return (
    <div className="min-h-screen bg-background pb-10">
      <StoreHeader />

      <main className="mx-auto max-w-3xl space-y-5 px-4 py-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Pedido #2849
            </p>
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
              Acompanhe seu pedido
            </h1>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground shadow-[var(--shadow-primary-glow)]">
            <Clock className="h-3.5 w-3.5" strokeWidth={2} />
            {eta}
          </span>
        </div>

        <section className="rounded-xl border border-border/70 bg-card p-5 shadow-[var(--shadow-card)] sm:p-6">
          <OrderStepper current={step} />
        </section>

        <section className="space-y-3 rounded-xl border border-border/70 bg-card p-4 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-bold text-foreground">Endereço de entrega</h2>
          </div>
          <p className="text-sm leading-relaxed text-foreground">
            Rua das Flores, 123 — Apto 4B
            <br />
            <span className="text-muted-foreground">Vila Madalena, São Paulo · 05417-010</span>
          </p>
          <a
            href="tel:+5511999999999"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
          >
            <Phone className="h-3.5 w-3.5" />
            Ligar para o entregador
          </a>
        </section>

        <section className="rounded-xl border border-border/70 bg-card p-4 shadow-[var(--shadow-card)]">
          <h2 className="mb-3 text-sm font-bold text-foreground">Resumo do pedido</h2>
          <ul className="space-y-2.5">
            {DEMO_ITEMS.map(({ product, quantity }) => (
              <li
                key={product.id}
                className="flex items-center justify-between gap-3 text-sm"
              >
                <span className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt=""
                    width={48}
                    height={48}
                    loading="lazy"
                    className="h-10 w-10 rounded-md object-cover"
                  />
                  <span className="font-semibold text-foreground">
                    <span className="text-muted-foreground">{quantity}× </span>
                    {product.name}
                  </span>
                </span>
                <span className="font-semibold tabular-nums text-foreground">
                  {formatBRL(product.price * quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-1.5 border-t border-border/70 pt-3 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span className="tabular-nums">{formatBRL(subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Taxa de entrega</span>
              <span className="tabular-nums">{formatBRL(store.deliveryFee)}</span>
            </div>
            <div className="flex justify-between pt-1 text-base font-extrabold text-foreground">
              <span>Total</span>
              <span className="tabular-nums text-primary">{formatBRL(total)}</span>
            </div>
          </div>
        </section>

        <Link
          to="/"
          className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-border/70 bg-card text-sm font-semibold text-foreground transition-all hover:border-primary/40 hover:text-primary"
        >
          Voltar ao cardápio
        </Link>
      </main>
    </div>
  );
}
