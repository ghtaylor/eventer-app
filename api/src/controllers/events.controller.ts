import * as schema from "@eventer-app/db/schema";
import { ParseError } from "errors/ParseError";
import { Request, Response } from "express";
import { Result, fromThrowable } from "neverthrow";
import Repository from "repositories/base.repository";
import { z } from "zod";

export default class EventsController {
  constructor(private readonly repository: Repository<schema.EventWithTickets, schema.NewEventWithTickets>) {}

  private parseId = fromThrowable(
    z.string().parse,
    (error) => new ParseError("Event ID not provided.", { originalError: error }),
  );

  private parseNewEventWithTickets = fromThrowable(
    schema.NewEventWithTickets.parse,
    (error) => new ParseError("Event with tickets not provided.", { originalError: error }),
  );

  getAll(_req: Request, res: Response): Promise<void> {
    return this.repository.getAll().match(
      (events) => void res.json(events),
      (error) => void res.status(500).json({ error: error.message }),
    );
  }

  getOne(req: Request, res: Response): Promise<void> {
    return this.parseId(req.params.id)
      .asyncAndThen(this.repository.getOne.bind(this.repository))
      .match(
        (event) => (event ? void res.json(event) : void res.status(404).json({ error: "Event not found" })),
        (error) => void res.status(500).json({ error: error.message }),
      );
  }

  create(req: Request, res: Response): Promise<void> {
    return this.parseNewEventWithTickets(req.body)
      .asyncAndThen(this.repository.create.bind(this.repository))
      .match(
        () => void res.status(201).send(),
        (error) => {
          if (error instanceof ParseError) return void res.status(400).json({ error: error.message });
          return void res.status(500).json({ error: error.message });
        },
      );
  }

  update(req: Request, res: Response): Promise<void> {
    return Result.combine([this.parseId(req.params.id), this.parseNewEventWithTickets(req.body)])
      .asyncAndThen(([id, newEventWithTickets]) => this.repository.update(id, newEventWithTickets))
      .match(
        () => void res.status(204).send(),
        (error) => {
          if (error instanceof ParseError) return void res.status(400).json({ error: error.message });
          return void res.status(500).json({ error: error.message });
        },
      );
  }

  delete(req: Request, res: Response): Promise<void> {
    return this.parseId(req.params.id)
      .asyncAndThen(this.repository.delete.bind(this.repository))
      .match(
        () => void res.status(204).send(),
        (error) => void res.status(500).json({ error: error.message }),
      );
  }
}
