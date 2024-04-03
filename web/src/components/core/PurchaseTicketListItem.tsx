"use client";

import { Ticket } from "@kaboodle-events-app/db/schema";
import React, { forwardRef, useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { LuMinus, LuPlus } from "react-icons/lu";

interface PurchaseTicketListItemProps {
  ticket: Ticket;
  onSelectedCountChange?: (id: string, count: number) => void;
}

const PurchaseTicketListItem = forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement> & PurchaseTicketListItemProps
>(({ ticket, onSelectedCountChange, className, ...props }, ref) => {
  const [selectedCount, setSelectedCount] = useState(0);

  const ticketPrice = useMemo(() => ticket.priceCentAmount / 100, [ticket.priceCentAmount]);
  const ticketBookingFee = useMemo(() => ticket.bookingFeeCentAmount / 100, [ticket.bookingFeeCentAmount]);

  const increment = useCallback(() => {
    setSelectedCount((count) => Math.min(count + 1, ticket.quantity));
  }, []);

  const decrement = useCallback(() => {
    setSelectedCount((count) => Math.max(0, count - 1));
  }, []);

  useEffect(() => {
    if (onSelectedCountChange) {
      onSelectedCountChange(ticket.id, selectedCount);
    }
  }, [onSelectedCountChange, selectedCount, ticket.id]);

  return (
    <li ref={ref} className={cn("flex gap-x-6 items-center p-4", className)} {...props}>
      <span className="text-3xl font-bold w-6">{selectedCount}</span>
      <div className="flex-grow">
        <h3 className="text-lg font-bold">{ticket.type}</h3>
        <span className="block">£{ticketPrice}</span>
        <span className="text-sm italic block">+ £{ticketBookingFee} booking fee</span>
      </div>
      <div>
        <Button variant="secondary" onClick={decrement}>
          <LuMinus />
        </Button>
        <Button variant="secondary" onClick={increment}>
          <LuPlus />
        </Button>
      </div>
    </li>
  );
});

PurchaseTicketListItem.displayName = "PurchaseTicketListItem";

export default PurchaseTicketListItem;
