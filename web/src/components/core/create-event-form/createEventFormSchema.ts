import { z } from "zod";

export const CreateEventFormSchema = z.object({
  name: z.string().trim().min(3, "Event name must be at least 3 characters long.").max(256, "Event name is too long."),
  description: z.string().trim().max(1024, "Description is too long."),
  date: z.date(),
  tickets: z
    .array(
      z.object({
        type: z.enum(["Adult", "Child", "Family"], {
          errorMap: () => ({
            message: "Ticket type is required",
          }),
        }),
        price: z
          .number({ invalid_type_error: "Price must be in GBP format", required_error: "Price is required" })
          .min(1, "Price must be at least £1")
          .multipleOf(0.01, "Price must be in GBP currency format"),
        bookingFee: z
          .number({
            invalid_type_error: "Booking fee must be in GBP format",
            required_error: "Booking fee is required",
          })
          .multipleOf(0.01, "Booking fee must be in GBP currency format"),
        quantity: z
          .number({
            invalid_type_error: "Quantity must be a number",
            required_error: "Quantity is required",
          })
          .min(1, { message: "Quantity must be at least 1" })
          .max(1000, { message: "Quantity must be at most 1000" }),
      }),
    )
    .min(1)
    .max(3),
});

export type CreateEventFormSchema = z.infer<typeof CreateEventFormSchema>;
