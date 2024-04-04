import { EventWithTickets } from "@kaboodle-events-app/db/schema";
import Image from "next/image";

interface EventDescriptionSectionProps {
  event: EventWithTickets;
}

const EventDescriptionSection: React.FC<EventDescriptionSectionProps> = ({ event }) => {
  return (
    <section className="p-6">
      <p className=" leading-normal font-light">{event.description}</p>
    </section>
  );
};

export default EventDescriptionSection;
