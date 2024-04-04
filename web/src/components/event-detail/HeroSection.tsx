"use client";

import { EventWithTickets } from "@kaboodle-events-app/db/schema";
import Image from "next/image";
import { useMemo, useState } from "react";

interface HeroSectionProps {
  event: EventWithTickets;
}

const HeroSection: React.FC<HeroSectionProps> = ({ event }) => {
  const formattedDate = useMemo(
    () =>
      new Date(event.date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    [event.date],
  );

  const [placeholderImageRequired, setPlaceholderImageRequired] = useState(false);

  return (
    <section className="relative h-[50dvh] md:h-[80dvh] flex items-end">
      <Image
        src={placeholderImageRequired ? "/placeholder.jpg" : `/${event.id}.jpg`}
        alt={event.name}
        onError={() => setPlaceholderImageRequired(true)}
        className="object-cover"
        fill
      />
      <div className="z-10 w-full px-6 py-16 bg-gradient-to-t from-background to-transparent">
        <span className="">{formattedDate}</span>
        <h1 className=" text-5xl font-bold tracking-tighter">{event.name}</h1>
      </div>
    </section>
  );
};

export default HeroSection;
