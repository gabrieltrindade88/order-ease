import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, MapPin, CreditCard, Wallet, QrCode, ShoppingBag } from "lucide-react";
import { StoreHeader } from "@/components/store/StoreHeader";
import { CartLineItem } from "@/components/store/CartLineItem";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart, selectSubtotal } from "@/stores/cart";
import { store } from "@/data/menu";
import { formatBRL } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Seu carrinho — Cantina Verde" },
      { name: "description", content: "Revise seu pedido e finalize a compra na Cantina Verde." },
      { property: "og:title", content: "Seu carrinho — Cantina Verde" },
      { property: "og:description", content: "Revise seu pedido e finalize a compra." },
    ],
  }),
  component: CartPage,
});

const PAYMENTS = [
  { id: "credit", label: "Cartão de crédito", Icon: CreditCard },
  { id: "pix", label: "Pix", Icon: QrCode },
  { id: "cash", label: "Dinheiro na entrega", Icon: Wallet },
] as const;

function CartPage() {
  const items = useCart((s) => s.items);
  const subtotal = useCart(selectSubtotal);
  const clear = useCart((s) => s.clear);
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState<string>("credit");

  const total = subtotal + (items.length > 0 ? store.deliveryFee : 0);

  const handlePlace = () => {
    if (!address.trim()) return;
    // demo: clear cart after placing
    clear();
    navigate({ to: "/order/tracking" });
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      <StoreHeader />

      <main className="mx-auto max-w-3xl px-4 py-6">
        <Link
          to="/"
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Continuar comprando
        </Link>

        <h1 className="mb-5 text-2xl font-extrabold tracking-tight text-foreground">
          Seu carrinho
        </h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border/70 bg-card p-10 text-center shadow-[var(--shadow-card)]">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-muted-foreground">
              <ShoppingBag className="h-6 w-6" strokeWidth={1.75} />
            </span>
            <div>
              <p className="font-semibold text-foreground">Seu carrinho está vazio</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Adicione itens do cardápio para começar.
              </p>
            </div>
            <Link
              to="/"
              className="mt-2 inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-primary-glow)] transition-all hover:bg-primary/90"
            >
              Ver cardápio
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Items */}
            <section className="space-y-3">
              {items.map((item) => (
                <CartLineItem key={item.product.id} item={item} />
              ))}
            </section>

            {/* Address */}
            <section className="space-y-3 rounded-xl border border-border/70 bg-card p-4 shadow-[var(--shadow-card)]">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <h2 className="text-sm font-bold text-foreground">Endereço de entrega</h2>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="address" className="text-xs font-medium text-muted-foreground">
                  Rua, número, complemento e bairro
                </Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Ex.: Rua das Flores, 123, Apto 4B — Vila Madalena"
                  className="h-12 rounded-xl border-border/70"
                />
              </div>
            </section>

            {/* Payment */}
            <section className="space-y-3 rounded-xl border border-border/70 bg-card p-4 shadow-[var(--shadow-card)]">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-primary" />
                <h2 className="text-sm font-bold text-foreground">Forma de pagamento</h2>
              </div>
              <RadioGroup value={payment} onValueChange={setPayment} className="space-y-2">
                {PAYMENTS.map(({ id, label, Icon }) => {
                  const checked = payment === id;
                  return (
                    <Label
                      key={id}
                      htmlFor={`pay-${id}`}
                      className={cn(
                        "flex cursor-pointer items-center justify-between gap-3 rounded-xl border bg-background p-3 transition-colors",
                        checked
                          ? "border-primary bg-accent/60"
                          : "border-border/70 hover:border-primary/40",
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={cn(
                            "flex h-9 w-9 items-center justify-center rounded-lg",
                            checked
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-muted-foreground",
                          )}
                        >
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="text-sm font-semibold text-foreground">{label}</span>
                      </span>
                      <RadioGroupItem id={`pay-${id}`} value={id} />
                    </Label>
                  );
                })}
              </RadioGroup>
            </section>

            {/* Summary */}
            <section className="space-y-2 rounded-xl border border-border/70 bg-card p-4 shadow-[var(--shadow-card)]">
              <h2 className="mb-2 text-sm font-bold text-foreground">Resumo do pedido</h2>
              <Row label="Subtotal" value={formatBRL(subtotal)} />
              <Row label="Taxa de entrega" value={formatBRL(store.deliveryFee)} />
              <div className="my-2 h-px bg-border/70" />
              <Row label="Total" value={formatBRL(total)} bold />
            </section>
          </div>
        )}
      </main>

      {items.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-background/90 px-4 py-3 backdrop-blur-md">
          <div className="mx-auto max-w-3xl">
            <Button
              type="button"
              onClick={handlePlace}
              disabled={!address.trim()}
              className="h-14 w-full rounded-xl bg-primary text-base font-semibold text-primary-foreground shadow-[var(--shadow-primary-glow)] transition-all duration-200 hover:bg-primary/90 disabled:opacity-60 disabled:shadow-none"
            >
              Finalizar pedido — {formatBRL(total)}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className={cn(bold ? "font-bold text-foreground" : "text-muted-foreground")}>
        {label}
      </span>
      <span
        className={cn(
          "tabular-nums",
          bold ? "text-base font-extrabold text-primary" : "font-semibold text-foreground",
        )}
      >
        {value}
      </span>
    </div>
  );
}
