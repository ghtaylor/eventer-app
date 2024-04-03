import EventsSection from "@/components/EventsSection";
import HeroSection from "@/components/HeroSection";

export default async function Home() {
  return (
    <main className="min-h-screen bg-gray-950">
      <HeroSection />
      <EventsSection />
    </main>
  );
}
