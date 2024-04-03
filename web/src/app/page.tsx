import EventsSection from "@/components/home/EventsSection";
import HeroSection from "@/components/home/HeroSection";

export default async function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <EventsSection />
    </main>
  );
}
