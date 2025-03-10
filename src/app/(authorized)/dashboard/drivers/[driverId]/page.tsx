import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getDriver } from "@/features/drivers/db/drivers";
import { formatDate, formatPhoneNumber } from "@/lib/utils";
import {
  Building2,
  CalendarPlus2,
  CreditCard,
  MapPin,
  MapPinHouse,
  Paperclip,
  Phone,
  ScrollText,
} from "lucide-react";

export default async function page({
  params,
}: {
  params: Promise<{ driverId: string }>;
}) {
  const driverId = (await params).driverId;
  const drivers = await getDriver(driverId);
  if (!drivers) return null;
  return (
    <div className="flex flex-col space-y-8">
      <div className="flex gap-6">
        <Avatar className="size-24 rounded-lg">
          <AvatarImage
            src={drivers.image ?? undefined}
            alt={drivers.first_name ?? undefined}
          />
          <AvatarFallback className="rounded-lg">
            <div className="size-10"></div>
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <p className="text-2xl font-semibold">{`${drivers.first_name + " " + drivers.last_name}`}</p>
          <Badge className="text-center">
            <p>Driver Active</p>
          </Badge>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <p className="font-medium text-lg">About</p>
        <div className="flex space-x-2 items-center">
          <Phone size={18} color="#6a7282" />
          <p className="text-gray-500">Phone: </p>
          <p className="text-gray-800">
            {formatPhoneNumber(drivers.phone_number)}
          </p>
        </div>
        <div className="flex space-x-2 items-center">
          <CreditCard size={18} color="#6a7282" />
          <p className="text-gray-500">License Number: </p>
          <p className="text-gray-800">{drivers.license_number}</p>
        </div>
        <div className="flex space-x-2 items-center">
          <Paperclip size={18} color="#6a7282" />
          <p className="text-gray-500">License Expiration: </p>
          <p className="text-gray-800">
            {formatDate(drivers.license_expiry.toLocaleString())}
          </p>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <p className="font-medium text-lg">Address</p>
        <div className="flex space-x-2 items-center">
          <MapPinHouse size={18} color="#6a7282" />
          <p className="text-gray-500">Address: </p>
          <p className="text-gray-800">{drivers.address}</p>
        </div>
        <div className="flex space-x-2 items-center">
          <Building2 size={18} color="#6a7282" />
          <p className="text-gray-500">City/Town: </p>
          <p className="text-gray-800">{drivers.city}</p>
        </div>
        <div className="flex space-x-2 items-center">
          <MapPin size={18} color="#6a7282" />
          <p className="text-gray-500">Postal Code: </p>
          <p className="text-gray-800">{drivers.post_code}</p>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <p className="font-medium text-lg">Driver Details</p>
        <div className="flex space-x-2 items-center">
          <ScrollText size={18} color="#6a7282" />
          <p className="text-gray-500">Date of birth: </p>
          <p className="text-gray-800">{drivers.date_of_birth?.toString()}</p>
        </div>
        <div className="flex space-x-2 items-center">
          <CalendarPlus2 size={18} color="#6a7282" />
          <p className="text-gray-500">Hire date: </p>
          <p className="text-gray-800">{drivers.hire_date?.toString()}</p>
        </div>
      </div>
      <Button>Edit driver information</Button>
    </div>
  );
}
