import EventDescriptionSection from "@/components/event-detail/EventDescriptionSection";
import HeroSection from "@/components/event-detail/HeroSection";
import TicketsSection from "@/components/event-detail/TicketsSection";
import { EventService } from "@/lib/data";

export default async function EventPage({ params }: { params: { id: string } }) {
  const eventService = new EventService();
  const event = await eventService.getEvent(params.id);

  return (
    <main className="min-h-screen bg-background">
      <HeroSection event={event} />
      <EventDescriptionSection event={event} />
      <TicketsSection tickets={event.tickets} />
    </main>
  );
}
