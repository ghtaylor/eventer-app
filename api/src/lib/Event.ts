import { z } from "zod";

export const Ticket = z.object({
  type: z.string(),
  priceCentAmount: z.coerce.number(),
  bookingFeeCentAmount: z.coerce.number(),
  isAvailable: z.boolean(),
});

export const Event = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  date: z.coerce.date(),
  tickets: z.array(Ticket),
});

export type Event = z.infer<typeof Event>;
export type Ticket = z.infer<typeof Ticket>;
