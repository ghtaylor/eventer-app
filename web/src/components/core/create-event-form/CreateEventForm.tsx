"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../../ui/button";
import { Form } from "../../ui/form";
import EventDetailsFormGroup from "./EventDetailsFormGroup";
import TicketDetailsFormGroup from "./TicketDetailsFormGroup";
import { CreateEventFormSchema } from "./createEventFormSchema";

export interface CreateEventFormProps {
  onSubmit: (data: CreateEventFormSchema) => void;
}

const CreateEventForm: React.FC<CreateEventFormProps> = ({ onSubmit }) => {
  const form = useForm<CreateEventFormSchema>({
    resolver: zodResolver(CreateEventFormSchema),
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
