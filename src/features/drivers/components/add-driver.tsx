import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DriverForm from "./add-driver-form";

export function AddDriver() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Driver</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Driver</DialogTitle>
        </DialogHeader>
        <DriverForm />
      </DialogContent>
    </Dialog>
  );
}
