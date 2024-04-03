import { EventWithTickets } from "@kaboodle-events-app/db/schema";

const API_BASE_URL = process.env.API_BASE_URL!;

export class EventService {
  constructor(private readonly baseUrl = API_BASE_URL) {}

  async getEvents(): Promise<EventWithTickets[]> {
    const response = await fetch(`${this.baseUrl}/events`, { next: { revalidate: 0 } });
    const data = await response.json();
    return data.map(EventWithTickets.parse);
  }

  async getEvent(id: string): Promise<EventWithTickets> {
    const response = await fetch(`${this.baseUrl}/events/${id}`, { next: { revalidate: 0 } });
    const data = await response.json();
    return EventWithTickets.parse(data);
  }
}
