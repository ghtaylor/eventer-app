import { relations } from "drizzle-orm";
import { date, integer, pgEnum, pgTable, text, uuid, varchar, timestamp } from "drizzle-orm/pg-core";

export const events = pgTable("events", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 256 }).notNull(),
  description: text("description"),
  date: timestamp("date", { withTimezone: true }).notNull(),
});

export const eventsRelations = relations(events, ({ many }) => ({
  tickets: many(tickets),
}));

export const ticketTypeEnum = pgEnum("ticket_type", ["Adult", "Family", "Child"]);

export const tickets = pgTable("tickets", {
  id: uuid("id").primaryKey().defaultRandom(),
  eventId: uuid("event_id")
    .references(() => events.id)
    .notNull(),
  type: ticketTypeEnum("type").notNull(),
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
