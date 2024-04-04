"use client";

import { deleteEvent } from "@/app/actions";
import { useState } from "react";
import { LuTrash2 } from "react-icons/lu";
import DeleteEventAlertDialog from "../core/DeleteEventAlertDialog";
import { Button } from "../ui/button";

interface DeleteEventProps {
  eventId: string;
}

const DeleteEvent: React.FC<DeleteEventProps> = ({ eventId }) => {
  const [deleteEventOpen, setDeleteEventOpen] = useState<boolean>(false);

  const handleDeleteEventOpenChange = (open: boolean) => {
    setDeleteEventOpen(open);
  };

  const handleDeleteEventClick = () => {
    setDeleteEventOpen(true);
  };

  const handleDeleteEvent = () => {
    setDeleteEventOpen(false);
    deleteEvent(eventId);
  };

  return (
    <>
      <Button variant="link" className="p-0" onClick={handleDeleteEventClick}>
        <LuTrash2 className="h-4 w-4" />
        <span className="ml-2">Delete event</span>
      </Button>
      <DeleteEventAlertDialog
        open={deleteEventOpen}
        onOpenChange={handleDeleteEventOpenChange}
        onDelete={handleDeleteEvent}
      />
    </>
  );
};

export default DeleteEvent;
