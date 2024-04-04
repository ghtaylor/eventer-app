"use client";

import { cn } from "@/lib/utils";
import { EventWithTickets } from "@kaboodle-events-app/db/schema";
import Image from "next/image";
import Link, { LinkProps } from "next/link";
import { forwardRef, useMemo, useState } from "react";

interface EventListItemProps {
  event: EventWithTickets;
}

const EventListItem = forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement> & Pick<LinkProps, "href"> & EventListItemProps
>(({ event, href, className, ...props }, ref) => {
  const formattedDate = useMemo(
    () =>
      new Date(event.date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    [event.date],
  );

  const isAvailable = useMemo(() => event.tickets.some((ticket) => ticket.quantity > 0), [event.tickets]);

  const [placeholderImageRequired, setPlaceholderImageRequired] = useState(false);

  return (
    <li ref={ref} className={cn("relative group overflow-hidden", className)} {...props}>
      <Link href={href}>
        <Image
          src={placeholderImageRequired ? "/placeholder.jpg" : `/${event.id}.jpg`}
          alt={event.name}
          onError={() => setPlaceholderImageRequired(true)}
          className="object-cover scale-100 group-hover:scale-105 transition-all"
          fill
        />
        <div className="h-full flex flex-col justify-between">
          <div className="z-10 m-6">
            <span className=" font-bold uppercase bg-background p-2">{isAvailable ? "Available" : "Sold Out"}</span>
          </div>
          <div className="w-full p-6 bg-gradient-to-t from-background to-transparent z-10">
            <span className="">{formattedDate}</span>
            <h2 className=" text-5xl font-bold tracking-tighter">{event.name}</h2>
          </div>
        </div>
      </Link>
    </li>
  );
});

EventListItem.displayName = "EventListItem";

export default EventListItem;
