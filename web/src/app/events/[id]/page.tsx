import EventDescriptionSection from "@/components/event-detail/ContentSection";
import HeroSection from "@/components/event-detail/HeroSection";
import ContentSection from "@/components/event-detail/ContentSection";
import { EventService } from "@/lib/data";

export default async function EventPage({ params }: { params: { id: string } }) {
  const eventService = new EventService();
  const event = await eventService.getEvent(params.id);

  return (
    <main className="min-h-screen bg-background">
      <HeroSection event={event} />
      <ContentSection event={event} />
    </main>
  );
}
