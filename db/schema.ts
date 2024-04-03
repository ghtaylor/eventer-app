import { relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const events = pgTable("events", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 256 }).notNull(),
  description: text("description"),
  date: timestamp("date", { withTimezone: true }).notNull(),
});

export const eventsRelations = relations(events, ({ many }) => ({
  tickets: many(tickets),
}));

export const tickets = pgTable("tickets", {
  id: uuid("id").primaryKey().defaultRandom(),
  eventId: uuid("event_id")
    .references(() => events.id, { onDelete: "cascade" })
    .notNull(),
  type: varchar("type", { length: 256 }).notNull(),
  priceCentAmount: integer("price_cent_amount").notNull(),
  bookingFeeCentAmount: integer("booking_fee_cent_amount").notNull(),
  quantity: integer("quantity").notNull(),
});

export const ticketsRelations = relations(tickets, ({ one }) => ({
  event: one(events, {
    fields: [tickets.eventId],
    references: [events.id],
  }),
}));

export const Event = createSelectSchema(events);
export const Ticket = createSelectSchema(tickets);
export const EventWithTickets = Event.extend({
  tickets: Ticket.array(),
});
export const NewEvent = createInsertSchema(events);
export const NewTicket = createInsertSchema(tickets);
export const NewEventWithTickets = NewEvent.extend({
  tickets: NewTicket.array(),
});

export type Event = z.infer<typeof Event>;
export type Ticket = z.infer<typeof Ticket>;
export type EventWithTickets = z.infer<typeof EventWithTickets>;
export type NewEvent = z.infer<typeof NewEvent>;
export type NewTicket = z.infer<typeof NewTicket>;
export type NewEventWithTickets = z.infer<typeof NewEventWithTickets>;
