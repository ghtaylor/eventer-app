"use client";

import { useState } from "react";
import CreateEventDialog from "../core/CreateEventDialog";
import CreateEventListItem from "../core/CreateEventListItem";
import CreateEventForm from "../core/CreateEventForm";

const CreateEvent: React.FC = () => {
  const [createEventOpen, setCreateEventOpen] = useState<boolean>(false);

  const handleCreateEventOpenChange = (open: boolean) => {
    setCreateEventOpen(open);
  };

  const handleCreateEventClick = () => {
    setCreateEventOpen(true);
  };

  return (
    <>
      <CreateEventListItem onClick={handleCreateEventClick} className="h-96 md:h-[32rem]" />
      <CreateEventDialog open={createEventOpen} onOpenChange={handleCreateEventOpenChange}>
        <CreateEventForm />
      </CreateEventDialog>
    </>
  );
};

export default CreateEvent;
