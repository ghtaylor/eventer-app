import EventListItem from "@/components/main/EventListItem";
import { getEvents } from "@/lib/data";

export default async function Home() {
  const events = await getEvents();
  return (
    <main className="min-h-screen p-4">
      <section>
        <div className="flex justify-between">
          <h2 className="font-bold text-lg">Upcoming Events</h2>
          <a href="#" className="text-sm">
            See all
          </a>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventListItem className="h-96 md:h-[32rem]" key={event.id} event={event} />
          ))}
        </ul>
      </section>
    </main>
  );
}
