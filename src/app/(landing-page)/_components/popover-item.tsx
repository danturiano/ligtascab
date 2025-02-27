import React from 'react';

type PopoverItemProps = {
	children?: React.ReactNode;
	title: string;
	subtitle: string;
};

export default function PopoverItem({
	children,
	title,
	subtitle,
}: PopoverItemProps) {
	return (
		<div className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent">
			{children && (
				<div className="border border-muted size-10 flex items-center justify-center text-muted rounded-lg">
					{children}
				</div>
			)}
			<div className="flex flex-col">
				<p>{title}</p>
				<p className="text-muted">{subtitle}</p>
			</div>
		</div>
	);
}
