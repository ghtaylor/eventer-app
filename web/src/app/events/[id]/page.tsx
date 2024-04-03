import { EventService } from "@/lib/data";
import Image from "next/image";
import { useMemo } from "react";

export default async function EventPage({ params }: { params: { id: string } }) {
  const eventService = new EventService();
  const event = await eventService.getEvent(params.id);

  const formattedDate = new Date(event.date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="min-h-screen bg-gray-950">
      <section className="relative h-[50dvh] md:h-[80dvh] flex items-end">
        <Image src={`/${event.id}.jpg`} alt={event.name} className="object-cover" fill />
        <div className="z-10 w-full px-8 py-16 bg-gradient-to-t from-gray-950 to-transparent">
          <span className="text-white">{formattedDate}</span>
          <h2 className="text-white text-5xl font-bold tracking-tighter">{event.name}</h2>
        </div>
      </section>
      <section className="p-8">
        <p className="text-white leading-normal font-light">{event.description}</p>
      </section>
    </main>
  );
}
