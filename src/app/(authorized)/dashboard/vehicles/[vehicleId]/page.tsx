import React from 'react';

export default async function page({
	params,
}: {
	params: Promise<{ vehicleId: string }>;
}) {
	const vehicleId = (await params).vehicleId;
	return <div>{vehicleId}</div>;
}
