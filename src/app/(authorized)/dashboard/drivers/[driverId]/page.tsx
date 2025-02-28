import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getDriver } from "@/features/drivers/db/drivers";
import { formatDate, formatPhoneNumber } from "@/lib/utils";
import { CreditCard, Paperclip, Phone } from "lucide-react";
import React from "react";

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
    </div>
  );
}
