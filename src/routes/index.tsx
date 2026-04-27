import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { StoreHeader } from "@/components/store/StoreHeader";
import { StoreHero } from "@/components/store/StoreHero";
import { CategoryTabs } from "@/components/store/CategoryTabs";
import { ProductCard } from "@/components/store/ProductCard";
import { ProductSheet } from "@/components/store/ProductSheet";
import { StickyCartBar } from "@/components/store/StickyCartBar";
import { categories, products, type Product } from "@/data/menu";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cantina Verde — Cardápio e Delivery" },
      {
        name: "description",
        content:
          "Veja o cardápio da Cantina Verde: massas frescas, pizzas, saladas e sobremesas com entrega em 30–45 min.",
      },
      { property: "og:title", content: "Cantina Verde — Cardápio e Delivery" },
      {
        property: "og:description",
        content: "Massas, pizzas e sobremesas artesanais com entrega rápida.",
      },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selected, setSelected] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);

  const grouped = useMemo(() => {
    if (activeCategory === "all") {
      return categories
        .filter((c) => c.id !== "all")
        .map((c) => ({
          category: c,
          items: products.filter((p) => p.categoryId === c.id),
        }))
        .filter((g) => g.items.length > 0);
    }
    const c = categories.find((x) => x.id === activeCategory)!;
    return [{ category: c, items: products.filter((p) => p.categoryId === c.id) }];
  }, [activeCategory]);

  const handleSelect = (p: Product) => {
    setSelected(p);
    setOpen(true);
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      <StoreHeader />
      <StoreHero />
      <CategoryTabs active={activeCategory} onChange={setActiveCategory} />

      <main className="mx-auto max-w-5xl px-4 py-6">
        {grouped.map(({ category, items }) => (
          <section key={category.id} className="mb-8 last:mb-0">
            <h2 className="mb-3 text-lg font-bold tracking-tight text-foreground">
              {category.name}
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
              {items.map((p) => (
                <ProductCard key={p.id} product={p} onClick={() => handleSelect(p)} />
              ))}
            </div>
          </section>
        ))}
      </main>

      <ProductSheet product={selected} open={open} onOpenChange={setOpen} />
      <StickyCartBar />
    </div>
  );
}
