"use client";

import { useState } from "react";
import CreateEventDialog from "../core/CreateEventDialog";
import CreateEventListItem from "../core/CreateEventListItem";
import CreateEventForm, { CreateEventFormProps } from "../core/CreateEventForm";
import { createEvent } from "@/app/actions";

const CreateEvent: React.FC = () => {
  const [createEventOpen, setCreateEventOpen] = useState<boolean>(false);

  const handleCreateEventOpenChange = (open: boolean) => {
    setCreateEventOpen(open);
  };

  const handleCreateEventClick = () => {
    setCreateEventOpen(true);
  };

  const handleOnSubmit: CreateEventFormProps["onSubmit"] = (event) => {
    setCreateEventOpen(false);
    createEvent(event);
  };

  return (
    <>
      <CreateEventListItem onClick={handleCreateEventClick} className="h-96 md:h-[32rem]" />
      <CreateEventDialog open={createEventOpen} onOpenChange={handleCreateEventOpenChange}>
        <CreateEventForm onSubmit={handleOnSubmit} />
      </CreateEventDialog>
    </>
  );
};

export default CreateEvent;
