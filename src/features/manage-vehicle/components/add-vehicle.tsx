import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import VehicleForm from './add-vehicle-form';

export function AddVehicle() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Add Vehicle</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add Vehicle</DialogTitle>
				</DialogHeader>
				<VehicleForm />
			</DialogContent>
		</Dialog>
	);
}
