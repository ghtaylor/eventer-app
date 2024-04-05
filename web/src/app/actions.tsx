"use server";

import { CreateEventFormSchema } from "@/components/core/create-event-form/createEventFormSchema";
import { EventService } from "@/lib/data";
import { NewEventWithTickets } from "@eventer-app/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import currency from "currency.js";

const eventService = new EventService();

export async function createEvent(formSchema: CreateEventFormSchema) {
  const event: NewEventWithTickets = {
    name: formSchema.name,
    description: formSchema.description,
    date: formSchema.date,
    tickets: formSchema.tickets.map((ticket) => ({
      type: ticket.type,
      priceCentAmount: currency(ticket.price).intValue,
      bookingFeeCentAmount: currency(ticket.bookingFee).intValue,
      quantity: ticket.quantity,
    })),
  };

  await eventService.createEvent(event);
  revalidatePath("/");
}

export async function deleteEvent(id: string) {
  await eventService.deleteEvent(id);
  revalidatePath("/");
  redirect("/");
}
