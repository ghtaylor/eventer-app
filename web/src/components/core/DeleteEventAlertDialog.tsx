import { AlertDialogProps } from "@radix-ui/react-alert-dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

type DeleteEventAlertDialogProps = {
  onDelete: () => void;
} & AlertDialogProps;

const DeleteEventAlertDialog: React.FC<DeleteEventAlertDialogProps> = ({ onDelete, ...props }) => {
  return (
    <AlertDialog {...props}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this event?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the event and remove the data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteEventAlertDialog;
