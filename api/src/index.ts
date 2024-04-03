import express from "express";
import EventsRepository from "repositories/events.repository";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "@kaboodle-events-app/db/schema";
import { createEventsRouter } from "routes/events.route";
import EventsController from "controllers/events.controller";

const app = express();

const db = drizzle(
  postgres({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  }),
  {
    schema,
  },
);

const eventsRepository = new EventsRepository(db);
const eventsController = new EventsController(eventsRepository);

app.use("/events", createEventsRouter(eventsController));

app.listen(process.env.API_PORT, () => {
  console.log(`Server is running on port ${process.env.API_PORT}`);
});
