"use server";

import { EventService } from "@/lib/data";
import { NewEventWithTickets } from "@kaboodle-events-app/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const eventService = new EventService();

export async function createEvent(event: NewEventWithTickets) {
  console.log(event);
  await eventService.createEvent(event);
  revalidatePath("/");
}

export async function deleteEvent(id: string) {
  await eventService.deleteEvent(id);
  revalidatePath("/");
  redirect("/");
}
