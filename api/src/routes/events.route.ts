import EventsController from "controllers/events.controller";
import { Router } from "express";

export const createEventsRouter = (controller: EventsController): Router => {
  const router = Router();

  router.get("/", controller.getAll.bind(controller));
  router.get("/:id", controller.getOne.bind(controller));
  router.post("/", controller.create.bind(controller));
  router.put("/:id", controller.update.bind(controller));
  router.delete("/:id", controller.delete.bind(controller));

  return router;
};
