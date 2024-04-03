import { cn } from "@/lib/utils";
import { EventWithTickets } from "@kaboodle-events-app/db/schema";
import Image from "next/image";
import { forwardRef, useMemo } from "react";

interface EventListItemProps {
  event: EventWithTickets;
}

const EventListItem = forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement> & EventListItemProps>(
  ({ event, className, ...props }, ref) => {
    const formattedDate = useMemo(
      () =>
        new Date(event.date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
      [event.date],
    );

    return (
      <li ref={ref} className={cn("relative w-full overflow-hidden", className)} {...props}>
        <Image src={`/${event.id}.jpg`} alt={event.name} className="object-cover" fill />
        <div className="absolute z-10 w-full bottom-0 p-4 bg-gradient-to-t from-gray-900 to-transparent">
          <span className="text-white">{formattedDate}</span>
          <h2 className="text-white text-5xl font-bold tracking-tighter">{event.name}</h2>
        </div>
      </li>
    );
  },
);

EventListItem.displayName = "EventListItem";

export default EventListItem;
