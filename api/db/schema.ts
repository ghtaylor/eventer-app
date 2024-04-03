import { relations } from "drizzle-orm";
import { date, integer, pgEnum, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";

export const events = pgTable("events", {
  id: uuid("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  description: text("description"),
  date: date("date").notNull(),
});

export const eventsRelations = relations(events, ({ many }) => ({
  tickets: many(tickets),
}));

export const ticketTypeEnum = pgEnum("ticket_type", ["Adult", "Family", "Child"]);

export const tickets = pgTable("tickets", {
  id: uuid("id").primaryKey(),
  eventId: uuid("event_id")
    .references(() => events.id)
    .notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  type: ticketTypeEnum("type").notNull(),
  priceCentAmount: integer("price_cent_amount").notNull(),
  bookingFeeCentAmount: integer("booking_fee_cent_amount").notNull(),
  quantity: integer("quantity").notNull(),
});
