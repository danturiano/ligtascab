import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ driverId: string }>;
}) {
  const driverId = (await params).driverId;
  return <div>{driverId}</div>;
}
