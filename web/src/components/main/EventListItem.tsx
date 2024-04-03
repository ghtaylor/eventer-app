import { Event, EventWithTickets } from "@kaboodle-events-app/db/schema";
import Image from "next/image";
import { memo, useMemo } from "react";

interface EventListItemProps {
  event: EventWithTickets;
}

const EventListItem: React.FC<EventListItemProps> = ({ event }) => {
  const formattedDate = useMemo(
    () => new Date(event.date).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }),
    [event.date],
  );

  return (
    <li className="relative h-96 w-full overflow-hidden">
      <Image src={`/${event.id}.jpg`} alt={event.name} layout="fill" objectFit="cover" />
      <div className="absolute z-10 w-full bottom-0 p-4 bg-gradient-to-t from-gray-900 to-transparent">
        <span className="text-white uppercase">{formattedDate}</span>
        <h2 className="text-white text-5xl">{event.name}</h2>
      </div>
    </li>
  );
};

export default EventListItem;
