import { QRCodeCanvas } from 'qrcode.react';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { QrCode } from 'lucide-react';

export default function GenerateQRCode({ id }: { id: string }) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" className="[&_svg]:size-6">
					<QrCode />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Tricycle QR Code</DialogTitle>
					<DialogDescription>
						Please make sure to attach to the corresponding tricycle.
					</DialogDescription>
				</DialogHeader>
				<div className="flex items-center justify-center">
					<QRCodeCanvas
						value={id}
						minVersion={1}
						level="L"
						size={180}
						marginSize={4}
						title="Ligtascab"
					/>
				</div>
				<DialogFooter className="sm:justify-start">
					<DialogClose asChild>
						<Button type="button" variant="outline">
							Close
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
