import EventsSection from "@/components/EventsSection";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";

export default async function Home() {
  return (
    <main className="min-h-screen bg-gray-950">
      <Navbar />
      <HeroSection />
      <EventsSection />
    </main>
  );
}
