"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { QuickOrderModal } from "./QuickOrderModal";

/** What the customer wants to order — optional, the modal also works as a "call me back" form. */
export interface QuickOrderContext {
  productName?: string;
  variantLabel?: string;
  quantity?: number;
  unitPrice?: number;
  image?: string;
}

interface QuickOrderApi {
  openQuickOrder: (ctx?: QuickOrderContext) => void;
}

const Ctx = createContext<QuickOrderApi | null>(null);

export function QuickOrderProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState<QuickOrderContext>({});

  const openQuickOrder = useCallback((ctx: QuickOrderContext = {}) => {
    setOrder(ctx);
    setOpen(true);
  }, []);

  const value = useMemo(() => ({ openQuickOrder }), [openQuickOrder]);

  return (
    <Ctx.Provider value={value}>
      {children}
      <QuickOrderModal open={open} order={order} onClose={() => setOpen(false)} />
    </Ctx.Provider>
  );
}

export function useQuickOrder(): QuickOrderApi {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useQuickOrder must be used inside <QuickOrderProvider>");
  return ctx;
}
