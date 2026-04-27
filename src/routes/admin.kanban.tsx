import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  STATUS_META,
  STATUS_ORDER,
  useOrders,
  type Order,
  type OrderStatus,
} from "@/stores/orders";
import { formatBRL } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Bike,
  CheckCircle2,
  ChefHat,
  Clock,
  CreditCard,
  Inbox,
  MapPin,
  Phone,
  RotateCcw,
  Banknote,
  Wallet,
} from "lucide-react";

export const Route = createFileRoute("/admin/kanban")({
  head: () => ({
    meta: [
      { title: "Kanban de pedidos — Admin Cantina Verde" },
      {
        name: "description",
        content: "Gerencie os pedidos da Cantina Verde em tempo real no painel administrativo.",
      },
    ],
  }),
  component: AdminKanbanPage,
});

const COLUMN_ICON: Record<OrderStatus, React.ComponentType<{ className?: string }>> = {
  received: Inbox,
  preparing: ChefHat,
  delivery: Bike,
  delivered: CheckCircle2,
};

function AdminKanbanPage() {
  const orders = useOrders((s) => s.orders);
  const setStatus = useOrders((s) => s.setStatus);
  const reset = useOrders((s) => s.reset);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState<OrderStatus | null>(null);

  const grouped = STATUS_ORDER.reduce(
    (acc, status) => {
      acc[status] = orders
        .filter((o) => o.status === status)
        .sort((a, b) => b.createdAt - a.createdAt);
      return acc;
    },
    {} as Record<OrderStatus, Order[]>,
  );

  const handleDrop = (status: OrderStatus) => {
    if (draggingId) setStatus(draggingId, status);
    setDraggingId(null);
    setDragOver(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 border-b border-border/70 bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="icon" className="rounded-xl">
              <Link to="/" aria-label="Voltar">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Painel administrativo
              </p>
              <h1 className="text-lg font-extrabold tracking-tight text-foreground sm:text-xl">
                Kanban de pedidos
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="hidden rounded-full bg-muted px-3 py-1 font-semibold text-foreground sm:inline-flex">
              {orders.length} pedidos
            </Badge>
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl"
              onClick={() => reset()}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Resetar
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {STATUS_ORDER.map((status) => {
            const Icon = COLUMN_ICON[status];
            const meta = STATUS_META[status];
            const list = grouped[status];
            const isOver = dragOver === status;
            return (
              <section
                key={status}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(status);
                }}
                onDragLeave={() =>
                  setDragOver((curr) => (curr === status ? null : curr))
                }
                onDrop={() => handleDrop(status)}
                className={`flex min-h-[300px] flex-col rounded-2xl border bg-card p-3 transition-all ${
                  isOver
                    ? "border-primary bg-primary/5 ring-2 ring-primary/30"
                    : "border-border/70"
                }`}
              >
                <header className="mb-3 flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${meta.tone}`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <h2 className="text-sm font-bold tracking-tight text-foreground">
                      {meta.label}
                    </h2>
                  </div>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground">
                    {list.length}
                  </span>
                </header>

                <div className="flex flex-col gap-3">
                  {list.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      onDragStart={() => setDraggingId(order.id)}
                      onDragEnd={() => {
                        setDraggingId(null);
                        setDragOver(null);
                      }}
                      onAdvance={() => {
                        const idx = STATUS_ORDER.indexOf(order.status);
                        const next = STATUS_ORDER[idx + 1];
                        if (next) setStatus(order.id, next);
                      }}
                    />
                  ))}
                  {list.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-border/70 px-3 py-8 text-center text-xs font-medium text-muted-foreground">
                      Nenhum pedido
                    </div>
                  ) : null}
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
}

function OrderCard({
  order,
  onDragStart,
  onDragEnd,
  onAdvance,
}: {
  order: Order;
  onDragStart: () => void;
  onDragEnd: () => void;
  onAdvance: () => void;
}) {
  const minutes = Math.max(
    1,
    Math.floor((Date.now() - order.createdAt) / 60_000),
  );
  const isLast = order.status === "delivered";
  const PaymentIcon =
    order.payment === "credit"
      ? CreditCard
      : order.payment === "pix"
        ? Wallet
        : Banknote;
  const paymentLabel =
    order.payment === "credit" ? "Crédito" : order.payment === "pix" ? "Pix" : "Dinheiro";

  return (
    <article
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className="cursor-grab rounded-xl border border-border/70 bg-background p-3 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-md active:cursor-grabbing"
    >
      <header className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-extrabold tracking-tight text-foreground">
            {order.id}
          </p>
          <p className="text-xs font-semibold text-foreground">
            {order.customer}
          </p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">
          <Clock className="h-3 w-3" />
          {minutes}m
        </span>
      </header>

      <ul className="mt-3 space-y-1 border-t border-border/60 pt-3 text-xs text-muted-foreground">
        {order.items.map((i) => (
          <li key={i.productId} className="flex justify-between gap-2">
            <span className="truncate">
              <span className="font-semibold text-foreground">{i.quantity}×</span>{" "}
              {i.name}
            </span>
            <span className="shrink-0 tabular-nums">{formatBRL(i.price * i.quantity)}</span>
          </li>
        ))}
      </ul>

      <div className="mt-3 space-y-1.5 border-t border-border/60 pt-3 text-xs text-muted-foreground">
        <p className="flex items-start gap-1.5">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{order.address}</span>
        </p>
        <p className="flex items-center gap-1.5">
          <Phone className="h-3.5 w-3.5 shrink-0" />
          {order.phone}
        </p>
      </div>

      <footer className="mt-3 flex items-center justify-between border-t border-border/60 pt-3">
        <div>
          <p className="text-[11px] font-medium text-muted-foreground">Total</p>
          <p className="text-sm font-extrabold tabular-nums text-foreground">
            {formatBRL(order.total)}
          </p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-[11px] font-semibold text-foreground">
          <PaymentIcon className="h-3 w-3" />
          {paymentLabel}
        </span>
      </footer>

      {!isLast ? (
        <Button
          size="sm"
          className="mt-3 h-9 w-full rounded-xl bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
          onClick={onAdvance}
        >
          Avançar etapa
        </Button>
      ) : null}
    </article>
  );
}
