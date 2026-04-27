import { create } from "zustand";
import { persist } from "zustand/middleware";
import { products } from "@/data/menu";

export type OrderStatus = "received" | "preparing" | "delivery" | "delivered";

export type OrderItem = {
  productId: string;
  name: string;
  quantity: number;
  price: number;
};

export type Order = {
  id: string;
  customer: string;
  phone: string;
  address: string;
  items: OrderItem[];
  total: number;
  payment: "credit" | "pix" | "cash";
  status: OrderStatus;
  createdAt: number;
};

export const STATUS_META: Record<
  OrderStatus,
  { label: string; tone: string }
> = {
  received: { label: "Recebido", tone: "bg-blue-100 text-blue-700" },
  preparing: { label: "Preparando", tone: "bg-amber-100 text-amber-700" },
  delivery: { label: "Saiu para entrega", tone: "bg-purple-100 text-purple-700" },
  delivered: { label: "Entregue", tone: "bg-emerald-100 text-emerald-700" },
};

export const STATUS_ORDER: OrderStatus[] = [
  "received",
  "preparing",
  "delivery",
  "delivered",
];

const seed = (): Order[] => {
  const now = Date.now();
  const mk = (
    id: string,
    customer: string,
    phone: string,
    address: string,
    productIds: { id: string; qty: number }[],
    payment: Order["payment"],
    status: OrderStatus,
    minutesAgo: number,
  ): Order => {
    const items: OrderItem[] = productIds.map(({ id, qty }) => {
      const p = products.find((x) => x.id === id)!;
      return { productId: id, name: p.name, quantity: qty, price: p.price };
    });
    const total =
      items.reduce((acc, i) => acc + i.price * i.quantity, 0) + 699;
    return {
      id,
      customer,
      phone,
      address,
      items,
      total,
      payment,
      status,
      createdAt: now - minutesAgo * 60_000,
    };
  };
  return [
    mk("#1042", "Ana Beatriz", "(11) 98823-1122", "R. das Acácias, 120 — Apto 32", [
      { id: "pizza", qty: 1 },
      { id: "lemonade", qty: 2 },
    ], "pix", "received", 3),
    mk("#1041", "Lucas Pereira", "(11) 99114-7765", "Av. Paulista, 1578 — Sala 9", [
      { id: "burger", qty: 2 },
      { id: "wine", qty: 1 },
    ], "credit", "received", 8),
    mk("#1040", "Marina Souza", "(11) 97712-3344", "R. Augusta, 845", [
      { id: "pasta", qty: 1 },
      { id: "bruschetta", qty: 1 },
    ], "credit", "preparing", 14),
    mk("#1039", "Felipe Castro", "(11) 98821-4456", "R. Oscar Freire, 200", [
      { id: "salad", qty: 1 },
      { id: "lemonade", qty: 1 },
    ], "pix", "preparing", 22),
    mk("#1038", "Camila Rocha", "(11) 99332-1188", "Al. Santos, 1444", [
      { id: "pizza", qty: 2 },
      { id: "tiramisu", qty: 2 },
    ], "cash", "delivery", 35),
    mk("#1037", "Rodrigo Lima", "(11) 98445-9921", "R. Haddock Lobo, 678", [
      { id: "burger", qty: 1 },
    ], "credit", "delivered", 58),
  ];
};

type OrdersState = {
  orders: Order[];
  setStatus: (id: string, status: OrderStatus) => void;
  reset: () => void;
};

export const useOrders = create<OrdersState>()(
  persist(
    (set) => ({
      orders: seed(),
      setStatus: (id, status) =>
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === id ? { ...o, status } : o,
          ),
        })),
      reset: () => set({ orders: seed() }),
    }),
    { name: "cantina-verde-orders" },
  ),
);
