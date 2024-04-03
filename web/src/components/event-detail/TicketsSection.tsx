"use client";

import { Ticket } from "@kaboodle-events-app/db/schema";
import PurchaseTicketListItem from "../core/PurchaseTicketListItem";
import { Button } from "../ui/button";
import { useMemo, useState } from "react";

interface TicketsSectionProps {
  tickets: Ticket[];
}

const TicketsSection: React.FC<TicketsSectionProps> = ({ tickets }) => {
  const [selectedTickets, setSelectedTickets] = useState<{ [ticketId: string]: number }>({});

  const isPurchaseDisabled = useMemo(
    () => Object.values(selectedTickets).every((count) => count === 0),
    [selectedTickets],
  );

  const isEventAvailable = useMemo(() => tickets.some((ticket) => ticket.quantity > 0), [tickets]);

  const handleSelectedCountChange = (id: string, count: number) => {
    setSelectedTickets((prev) => ({ ...prev, [id]: count }));
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
                onSelectedCountChange={handleSelectedCountChange}
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
