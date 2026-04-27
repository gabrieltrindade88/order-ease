import { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { Product } from "@/data/menu";
import { formatBRL } from "@/lib/format";
import { useCart } from "@/stores/cart";
import { toast } from "sonner";

type Props = {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ProductSheet({ product, open, onOpenChange }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const addItem = useCart((s) => s.addItem);

  useEffect(() => {
    if (open) {
      setQuantity(1);
      setNotes("");
    }
  }, [open, product?.id]);

  if (!product) return null;

  const total = product.price * quantity;

  const handleAdd = () => {
    addItem(product, quantity, notes.trim() || undefined);
    toast.success(`${product.name} adicionado ao carrinho`);
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[92vh] border-border/70">
        <div className="mx-auto w-full max-w-xl overflow-y-auto">
          <div className="overflow-hidden rounded-t-xl">
            <img
              src={product.image}
              alt={product.name}
              width={768}
              height={768}
              className="aspect-[16/10] w-full object-cover"
            />
          </div>
          <DrawerHeader className="px-5 pt-5 text-left">
            <DrawerTitle className="text-2xl font-extrabold tracking-tight text-foreground">
              {product.name}
            </DrawerTitle>
            <DrawerDescription className="text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </DrawerDescription>
            <div className="pt-1 text-lg font-bold text-primary">{formatBRL(product.price)}</div>
          </DrawerHeader>

          <div className="space-y-5 px-5 pb-5">
            <div className="flex items-center justify-between rounded-xl border border-border/70 bg-secondary/60 p-2">
              <span className="pl-3 text-sm font-semibold text-foreground">Quantidade</span>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Diminuir"
                  className="h-10 w-10 rounded-full border-border/70 bg-card"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center text-base font-bold tabular-nums">
                  {quantity}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Aumentar"
                  className="h-10 w-10 rounded-full border-border/70 bg-card"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes" className="text-sm font-semibold text-foreground">
                Observações
              </Label>
              <Textarea
                id="notes"
                placeholder="Ex.: sem cebola, ponto da carne, etc."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="rounded-xl border-border/70"
              />
            </div>

            <Button
              type="button"
              onClick={handleAdd}
              className="h-14 w-full rounded-xl bg-primary text-base font-semibold text-primary-foreground shadow-[var(--shadow-primary-glow)] transition-all duration-200 hover:bg-primary/90"
            >
              Adicionar — {formatBRL(total)}
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
