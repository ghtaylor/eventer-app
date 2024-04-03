import HeroSection from "@/components/event-detail/HeroSection";
import TicketsSection from "@/components/event-detail/TicketsSection";
import { EventService } from "@/lib/data";

export default async function EventPage({ params }: { params: { id: string } }) {
  const eventService = new EventService();
  const event = await eventService.getEvent(params.id);

  return (
    <main className="min-h-screen bg-background">
      <HeroSection event={event} />
      <section className="p-6">
        <p className=" leading-normal font-light">{event.description}</p>
      </section>
      <TicketsSection tickets={event.tickets} />
    </main>
  );
}
