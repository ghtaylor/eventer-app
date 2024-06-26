import * as schema from "@eventer-app/db/schema";
import Repository from "./base.repository";
import { eq } from "drizzle-orm";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { ServiceError } from "errors/ServiceError";
import { ResultAsync, fromPromise } from "neverthrow";

export default class EventsRepository implements Repository<schema.EventWithTickets, schema.NewEventWithTickets> {
  constructor(private readonly db: PostgresJsDatabase<typeof schema>) {}

  getAll(): ResultAsync<schema.EventWithTickets[], ServiceError> {
    return fromPromise(
      this.db.query.events.findMany({
        orderBy: (events, { asc }) => [asc(events.date)],
        with: {
          tickets: true,
        },
      }),
      (error) => new ServiceError("Failed to select events", { originalError: error }),
    );
  }

  getOne(id: string): ResultAsync<schema.EventWithTickets | null, ServiceError> {
    return fromPromise(
      this.db.query.events.findFirst({
        where: eq(schema.events.id, id),
        with: {
          tickets: true,
        },
      }),
      (error) => new ServiceError("Failed to select event", { originalError: error }),
    ).map((event) => event ?? null);
  }

  create(newEventWithTickets: schema.NewEventWithTickets): ResultAsync<null, ServiceError> {
    return fromPromise(
      this.db.transaction(async (tx) => {
        const { tickets, ...event } = newEventWithTickets;
        const [{ id }] = await tx.insert(schema.events).values(event).returning({ id: schema.events.id });
        await tx.insert(schema.tickets).values(tickets.map((ticket) => ({ ...ticket, eventId: id })));
      }),
      (error) => new ServiceError("Failed to create event with tickets", { originalError: error }),
    ).map(() => null);
  }

  update(id: string, newEventWithTickets: schema.NewEventWithTickets): ResultAsync<null, ServiceError> {
    return fromPromise(
      this.db.transaction(async (tx) => {
        const { tickets, ...event } = newEventWithTickets;
        await tx.update(schema.events).set(event).where(eq(schema.events.id, id));
        await tx.delete(schema.tickets).where(eq(schema.tickets.eventId, id));
        await tx.insert(schema.tickets).values(tickets.map((ticket) => ({ ...ticket, eventId: id })));
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
