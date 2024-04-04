import { EventService } from "@/lib/data";
import EventListItem from "../core/EventListItem";
import CreateEvent from "./CreateEvent";

const EventsSection: React.FC = async () => {
  const eventService = new EventService();
  const events = await eventService.getEvents();

  return (
    <section>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventListItem className="h-96 md:h-[32rem]" key={event.id} event={event} href={`/events/${event.id}`} />
        ))}
        <CreateEvent />
      </ul>
    </section>
  );
};

export default EventsSection;
