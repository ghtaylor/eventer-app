"use client";

import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { LuPlus } from "react-icons/lu";
import { z } from "zod";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { NewEventWithTickets } from "@kaboodle-events-app/db/schema";

const formSchema = z.object({
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

type FormSchema = z.infer<typeof formSchema>;

export interface CreateEventFormProps {
  onSubmit: (event: NewEventWithTickets) => void;
}

const CreateEventForm: React.FC<CreateEventFormProps> = ({ onSubmit }) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      name: "",
      description: "",
      tickets: [
        {
          price: 0,
          bookingFee: 0,
          quantity: 0,
        },
      ],
    },
  });

  const {
    fields: ticketFields,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    rules: {
      minLength: 1,
      maxLength: 3,
    },
    name: "tickets",
  });

  const handleSubmit = async (data: FormSchema) => {
    onSubmit({
      name: data.name,
      description: data.description,
      date: data.date,
      tickets: data.tickets.map((ticket) => ({
        type: ticket.type,
        priceCentAmount: Number(ticket.price.toFixed(2)) * 100,
        bookingFeeCentAmount: Number(ticket.bookingFee.toFixed(2)) * 100,
        quantity: ticket.quantity,
      })),
    });
  };

  const formatDate = (date: Date): string =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  const handleAppendTicket = () => {
    if (ticketFields.length === 3) return;

    append({
      price: 0,
      bookingFee: 0,
      quantity: 0,
    } as FormSchema["tickets"][0]);
  };

  const handleRemoveTicket = (index: number) => {
    if (ticketFields.length === 1) return;

    remove(index);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 max-h-[600px] overflow-y-scroll overflow-x-visible"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                    >
                      {field.value ? formatDate(field.value) : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between items-center">
          <h2 className="font-bold text-lg">Tickets</h2>
          <Button variant="secondary" onClick={() => handleAppendTicket()}>
            <LuPlus className="h-4 w-4" />
          </Button>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {ticketFields.map((ticketField, index) => (
            <AccordionItem key={ticketField.id} value={`item-${index}`}>
              <AccordionTrigger>Ticket {index + 1}</AccordionTrigger>
              <AccordionContent className="space-y-6">
                <div className="flex gap-x-4">
                  <FormField
                    control={form.control}
                    name={`tickets.${index}.type`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Adult">Adult</SelectItem>
                            <SelectItem value="Child">Child</SelectItem>
                            <SelectItem value="Family">Family</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`tickets.${index}.quantity`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            {...form.register(`tickets.${index}.quantity`, { valueAsNumber: true })}
                            type="number"
                            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-x-4 w-full">
                  <FormField
                    control={form.control}
                    name={`tickets.${index}.price`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Price (£)</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            {...form.register(`tickets.${index}.price`, { valueAsNumber: true })}
                            type="number"
                            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`tickets.${index}.bookingFee`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Booking Fee (£)</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            {...form.register(`tickets.${index}.bookingFee`, { valueAsNumber: true })}
                            type="number"
                            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button variant="destructive" className="w-full" onClick={() => handleRemoveTicket(index)}>
                  Remove Ticket
                </Button>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default CreateEventForm;
