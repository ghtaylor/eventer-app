"use client";

import { EventWithTickets } from "@kaboodle-events-app/db/schema";
import { useMemo, useState } from "react";
import TicketCounterListItem from "../core/TicketCounterListItem";
import { Button } from "../ui/button";

interface ContentSectionProps {
  event: EventWithTickets;
}

const ContentSection: React.FC<ContentSectionProps> = ({ event }) => {
  const { tickets } = event;

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
    <section className="p-6 gap-6 grid grid-cols-1 container max-w-full md:max-w-2xl lg:max-w-7xl lg:grid-cols-3 lg:gap-12">
      <p className="font-light col-span-1 lg:col-span-2">{event.description}</p>

      {isEventAvailable ? (
        <div>
          <h2 className="font-bold text-2xl">Tickets</h2>
          <ul>
            {tickets.map((ticket) => (
              <TicketCounterListItem
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
        </div>
      ) : (
        <p className="border self-center p-4 text-center font-bold">SOLD OUT</p>
      )}
    </section>
  );
};

export default ContentSection;
