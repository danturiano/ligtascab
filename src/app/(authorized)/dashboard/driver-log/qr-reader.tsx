'use client';

import { Card } from '@/components/ui/card';
import { useState } from 'react';
import { QrReader } from 'react-qr-reader';

const QRCodeReader = () => {
	const [data, setData] = useState('No result');

	return (
		<Card className="w-full max-w-md mx-auto p-4">
			<div className="space-y-4">
				<div
					className="relative w-full bg-gray-100"
					style={{ minHeight: '300px' }}
				>
					<QrReader
						onResult={(result) => {
							if (result) {
								setData(result?.getText());
							}
						}}
						constraints={{
							facingMode: 'environment',
							width: { min: 640, ideal: 1280, max: 1920 },
							height: { min: 480, ideal: 720, max: 1080 },
						}}
						videoId="qr-video"
						className="w-full h-full"
						videoContainerStyle={{
							position: 'relative',
							width: '100%',
							minHeight: '300px',
						}}
						videoStyle={{
							width: '100%',
							height: '100%',
							objectFit: 'cover',
							position: 'absolute',
							top: 0,
							left: 0,
						}}
					/>
				</div>
				<div className="mt-4 p-2 bg-gray-100 rounded">
					<p className="text-center break-all">Scanned Result: {data}</p>
				</div>
			</div>
		</Card>
	);
};

export default QRCodeReader;
