import { Router } from "express";

const eventsRouter = Router();
const eventsController = new EventsController();

eventsRouter.get("/");
