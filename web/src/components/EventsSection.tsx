import { getEvents } from "@/lib/data";
import EventListItem from "./main/EventListItem";

const EventsSection: React.FC = async () => {
  const events = await getEvents();

  return (
    <section>
      <h2 className="px-4 py-12 font-bold text-3xl tracking-tighter text-white">Upcoming Events</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventListItem className="h-96 md:h-[32rem]" key={event.id} event={event} />
        ))}
      </ul>
    </section>
  );
};

export default EventsSection;
