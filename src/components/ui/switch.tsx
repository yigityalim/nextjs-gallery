"use client";

import * as SwitchPrimitives from "@radix-ui/react-switch";
import type * as React from "react";

import { cn } from "@/lib/utils";

export function Switch({
	className,
	...props
}: React.ComponentProps<typeof SwitchPrimitives.Root>) {
	return (
		<SwitchPrimitives.Root
			className={cn(
				"peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-brand-600 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-brand-600 data-[state=unchecked]:bg-offgray-200",
				className,
			)}
			{...props}
		>
			<SwitchPrimitives.Thumb
				className={cn(
					"pointer-events-none block size-4 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
				)}
			/>
		</SwitchPrimitives.Root>
	);
}
