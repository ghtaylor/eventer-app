import { Event } from "@kaboodle-events-app/db/schema";

const API_BASE_URL = process.env.API_BASE_URL!;

export const getEvents = async (baseUrl = API_BASE_URL): Promise<Event[]> => {
  const response = await fetch(`${baseUrl}/events`, { next: { revalidate: 0 } });
  return response.json();
};
