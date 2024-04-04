"use server";

import { EventService } from "@/lib/data";
import { NewEventWithTickets } from "@kaboodle-events-app/db/schema";
import { revalidatePath } from "next/cache";

export async function createEvent(event: NewEventWithTickets) {
  console.log(event);
  const eventService = new EventService();
  await eventService.createEvent(event);
  revalidatePath("/");
}
