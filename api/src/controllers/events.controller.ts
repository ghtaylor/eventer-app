import Repository from "core/repository";
import { Request, Response } from "express";
import { Event } from "lib/Event";
import { BaseController } from "./base.controller";

export default class EventsController implements BaseController<Request, Response> {
  constructor(private readonly repository: Repository<Event>) {}

  getAll(req: Request, res: Response): Promise<void> {
    return this.repository.getAll().match(
      (events) => void res.json(events),
      (error) => void res.status(500).json({ error: error.message }),
    );
  }

  getOne(req: Request, res: Response): Promise<void> {
    return this.repository.getOne(req.params.id).match(
      (event) => (event ? void res.json(event) : void res.status(404).json({ error: "Event not found" })),
      (error) => void res.status(500).json({ error: error.message }),
    );
  }

  create(req: Request, res: Response): Promise<void> {
    return this.eventParser
      .parseJsonString(req.body)
      .asyncAndThen(this.repository.create.bind(this.repository))
      .match(
        () => void res.status(201).send(),
        (error) => void res.status(500).json({ error: error.message }),
      );
  }

  update(req: Request, res: Response): Promise<void> {
    return this.eventParser
      .parseJsonString(req.body)
      .asyncAndThen(this.repository.update.bind(this.repository))
      .match(
        () => void res.status(204).send(),
        (error) => void res.status(500).json({ error: error.message }),
      );
  }

  delete(req: Request, res: Response): Promise<void> {
    return this.repository.delete(req.params.id).match(
      () => void res.status(204).send(),
      (error) => void res.status(500).json({ error: error.message }),
    );
  }
}
