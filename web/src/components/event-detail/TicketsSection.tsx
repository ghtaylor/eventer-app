"use client";

import { Ticket } from "@kaboodle-events-app/db/schema";
import PurchaseTicketListItem from "../core/PurchaseTicketListItem";
import { Button } from "../ui/button";
import { useMemo, useState } from "react";

interface TicketsSectionProps {
  tickets: Ticket[];
}

const TicketsSection: React.FC<TicketsSectionProps> = ({ tickets }) => {
  const [selectedTickets, setSelectedTickets] = useState<{ [ticketId: string]: number }>(
    tickets.reduce((acc, ticket) => ({ ...acc, [ticket.id]: 0 }), {}),
  );

  const isPurchaseDisabled = useMemo(
    () => Object.values(selectedTickets).every((count) => count === 0),
    [selectedTickets],
  );

  const isEventAvailable = useMemo(() => tickets.some((ticket) => ticket.quantity > 0), [tickets]);

  const handleIncrementCount = (id: string) => {
    const ticket = tickets.find((ticket) => ticket.id === id);
    setSelectedTickets((prev) => ({ ...prev, [id]: Math.min(prev[id] + 1, ticket?.quantity ?? 0) }));
  };

  const handleDecrementCount = (id: string) => {
    setSelectedTickets((prev) => ({ ...prev, [id]: Math.max(0, prev[id] - 1) }));
  };

  return (
    <section className="p-6">
      {isEventAvailable ? (
        <>
          <h2 className=" font-bold text-2xl">Tickets</h2>
          <ul>
            {tickets.map((ticket) => (
              <PurchaseTicketListItem
                key={ticket.id}
                ticket={ticket}
                incrementCount={() => handleIncrementCount(ticket.id)}
                decrementCount={() => handleDecrementCount(ticket.id)}
                selectedCount={selectedTickets[ticket.id]}
                className="w-full"
              />
            ))}
          </ul>
          <Button variant="default" disabled={isPurchaseDisabled} className="w-full mt-6">
            Purchase Tickets
          </Button>
        </>
      ) : (
        <p className="border p-4 text-center font-bold">SOLD OUT</p>
      )}
    </section>
  );
};

export default TicketsSection;
