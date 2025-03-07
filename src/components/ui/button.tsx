import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"group select-none text-sm tracking-tight rounded-sm flex gap-2 items-center justify-center text-nowrap border transition-colors duration-75 disabled:opacity-50 disabled:cursor-not-allowed px-3 h-9 data-kbd:pr-1.5 w-full sm:w-fit cursor-pointer",
	{
		variants: {
			variant: {
				default:
					"text-black dark:text-offgray-50 border-offgray-200/50 dark:border-offgray-400/20 bg-offgray-50/60 dark:bg-offgray-300/5 hover:bg-offgray-100/50 dark:hover:bg-offgray-200/10 [box-shadow:hsl(218,_13%,_50%,_0.1)_0_-2px_0_0_inset] dark:[box-shadow:hsl(218,_13%,_70%,_0.08)_0_-2px_0_0_inset] hover:[box-shadow:none] dark:hover:[box-shadow:none]",
				secondary:
					"bg-brand-500 border-transparent text-white [box-shadow:hsl(219,_93%,_30%)_0_-2px_0_0_inset,_hsl(219,_93%,_95%)_0_1px_3px_0] dark:[box-shadow:hsl(219,_93%,_30%)_0_-2px_0_0_inset,_hsl(0,_0%,_0%,_0.4)_0_1px_3px_0] hover:bg-[hsl(219,_93%,_35%)] active:[box-shadow:none] hover:[box-shadow:none] dark:hover:[box-shadow:none]",
				ghost:
					"border-transparent hover:bg-offgray-100/50 dark:hover:bg-offgray-500/10",
				blue: " text-blue-700 dark:text-blue-50 border-blue-500/20 dark:border-blue-300/10 bg-blue-50/60 dark:bg-blue-500/10 hover:bg-blue-100/50 dark:hover:bg-blue-500/20 [box-shadow:hsl(218,_50%,_60%,_0.1)_0_-2px_0_0_inset] dark:[box-shadow:hsl(218,_50%,_70%,_0.08)_0_-2px_0_0_inset] hover:[box-shadow:none] dark:hover:[box-shadow:none]",
				success:
					"bg-blue-500 text-white border-transparent dark:bg-accent-blue dark:[box-shadow:hsl(219,_93%,_30%)_0_-2px_0_0_inset,_hsl(0,_0%,_0%,_0.4)_0_1px_3px_0]",
				destructive:
					"bg-red-500 text-white border-transparent dark:bg-red-500 dark:[box-shadow:hsl(0,_93%,_30%)_0_-2px_0_0_inset,_hsl(0,_93%,_95%)_0_-2px_0_0_inset] hover:bg-red-600 active:[box-shadow:none] hover:[box-shadow:none] dark:hover:[box-shadow:none] [box-shadow:hsl(0,_93%,_30%)_0_-2px_0_0_inset,_hsl(0,_93%,_95%)_0_1px_3px_0]",
			},
			size: {
				default: "h-9 px-3",
				sm: "h-8 rounded-md px-3 text-xs",
				lg: "h-10 rounded-md px-8",
				icon: "size-9 px-2",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

function Button({
	className,
	variant,
	size,
	asChild = false,
	...props
}: Readonly<ButtonProps>) {
	const Comp = asChild ? Slot : "button";
	return (
		<Comp
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants };
export type { ButtonProps };
