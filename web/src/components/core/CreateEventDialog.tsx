import { DialogProps } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import CreateEventForm from "./CreateEventForm";

const CreateEventDialog: React.FC<DialogProps> = ({ children, ...props }) => {
  return (
    <Dialog {...props}>
      <DialogContent className="max-h-[600px] overflow-y-scroll overflow-x-visible">
        <DialogHeader>
          <DialogTitle>Create Event</DialogTitle>
          <DialogDescription>Complete the following details to create an event.</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default CreateEventDialog;
