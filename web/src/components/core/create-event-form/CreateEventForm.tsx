"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { NewEventWithTickets } from "@kaboodle-events-app/db/schema";
import { useFieldArray, useForm } from "react-hook-form";
import { LuPlus } from "react-icons/lu";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../ui/accordion";
import { Button } from "../../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { FormSchema } from "./formSchema";
import EventDetailsFormGroup from "./EventDetailsFormGroup";
import TicketDetailsFormGroup from "./TicketDetailsFormGroup";

export interface CreateEventFormProps {
  onSubmit: (event: NewEventWithTickets) => void;
}

const CreateEventForm: React.FC<CreateEventFormProps> = ({ onSubmit }) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(FormSchema),
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <EventDetailsFormGroup form={form} />
        <TicketDetailsFormGroup form={form} />
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default CreateEventForm;
