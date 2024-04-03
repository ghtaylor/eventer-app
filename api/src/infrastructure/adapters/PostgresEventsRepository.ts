import { ServiceError } from "core/errors/ServiceError";
import Repository from "core/repository";
import { eq } from "drizzle-orm";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { Event, Ticket } from "lib/Event";
import { ResultAsync, fromPromise } from "neverthrow";
import * as schema from "../../../db/schema";

type DbSelectEvent = typeof schema.events.$inferSelect & { tickets: Array<typeof schema.tickets.$inferSelect> };
type DbInsertEvent = typeof schema.events.$inferInsert;
type DbInsertTicket = typeof schema.tickets.$inferInsert;

const toEvent = (dbEvent: DbSelectEvent): Event => ({
  id: dbEvent.id,
  name: dbEvent.name,
  description: dbEvent.description,
  date: dbEvent.date,
  tickets: dbEvent.tickets.map<Ticket>((ticketDto) => ({
    type: ticketDto.type,
    priceCentAmount: ticketDto.priceCentAmount,
    bookingFeeCentAmount: ticketDto.bookingFeeCentAmount,
    isAvailable: ticketDto.quantity > 0,
  })),
});

const toInsertDbEvent = (event: Event): DbInsertEvent => ({
  id: event.id,
  name: event.name,
  description: event.description,
  date: event.date,
});

const toInsertDbTicket = (ticket: Ticket, eventId: string): DbInsertTicket => ({
  eventId,
  type: ticket.type,
  priceCentAmount: ticket.priceCentAmount,
  bookingFeeCentAmount: ticket.bookingFeeCentAmount,
  quantity: ticket.isAvailable ? 1 : 0,
});

export default class PostgresEventsRepository implements Repository<Event> {
  constructor(private readonly db: PostgresJsDatabase<typeof schema>) {}

  getAll(): ResultAsync<Event[], ServiceError> {
    return fromPromise(
      this.db.query.events.findMany({
        with: {
          tickets: true,
        },
      }),
      (error) => new ServiceError("Failed to select events", { originalError: error }),
    ).map((eventsDto) => eventsDto.map(toEvent));
  }

  getOne(id: string): ResultAsync<Event | null, ServiceError> {
    return fromPromise(
      this.db.query.events.findFirst({
        where: eq(schema.events.id, id),
        with: {
          tickets: true,
        },
      }),
      (error) => new ServiceError("Failed to select event", { originalError: error }),
    ).map((eventDto) => (eventDto ? toEvent(eventDto) : null));
  }

  create(event: Event): ResultAsync<null, ServiceError> {
    return fromPromise(
      this.db.transaction(async (tx) => {
        await tx.insert(schema.events).values(toInsertDbEvent(event));
        await tx.insert(schema.tickets).values(event.tickets.map((ticket) => toInsertDbTicket(ticket, event.id)));
      }),
      (error) => new ServiceError("Failed to create event with tickets", { originalError: error }),
    ).map(() => null);
  }

  update(id: string, event: Event): ResultAsync<null, ServiceError> {
    return fromPromise(
      this.db.transaction(async (tx) => {
        await tx.update(schema.events).set(toInsertDbEvent(event)).where(eq(schema.events.id, id));
        await tx.delete(schema.tickets).where(eq(schema.tickets.eventId, id));
        await tx.insert(schema.tickets).values(event.tickets.map((ticket) => toInsertDbTicket(ticket, id)));
      }),
      (error) => new ServiceError("Failed to update event", { originalError: error }),
    ).map(() => null);
  }

  delete(id: string): ResultAsync<null, ServiceError> {
    return fromPromise(
      this.db.delete(schema.events).where(eq(schema.events.id, id)),
      (error) => new ServiceError("Failed to delete event", { originalError: error }),
    ).map(() => null);
  }
}
