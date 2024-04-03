import { getEvents } from "@/lib/data";

export default async function Home() {
  const events = await getEvents();
  return <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>;
}
