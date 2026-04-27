import { Star, Clock, Bike } from "lucide-react";
import cover from "@/assets/cover-cantina.jpg";
import { store } from "@/data/menu";
import { formatBRL } from "@/lib/format";

export function StoreHero() {
  return (
    <section className="px-4 pt-4">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border/70 bg-card shadow-[var(--shadow-card)]">
        <div className="relative h-44 sm:h-60 md:h-72">
          <img
            src={cover}
            alt={`Interior do restaurante ${store.name}`}
            width={1536}
            height={896}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0" />
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-foreground shadow-[var(--shadow-soft)]">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" strokeWidth={2} />
            {store.rating.toFixed(1)}
            <span className="font-medium text-muted-foreground">({store.reviews})</span>
          </span>
        </div>
        <div className="space-y-3 p-5 sm:p-6">
          <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-foreground sm:text-3xl">
            {store.name}
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">{store.tagline}</p>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
              <Clock className="h-3.5 w-3.5" strokeWidth={2} />
              {store.deliveryTime}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground">
              <Bike className="h-3.5 w-3.5" strokeWidth={2} />
              Entrega {formatBRL(store.deliveryFee)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
