"use client";

import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import type { SwitchProps } from "@radix-ui/react-switch";
import { useTheme } from "next-themes";
import React from "react";

export function ThemeButton({ className, ...props }: Readonly<SwitchProps>) {
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => setMounted(true), []);

	const { theme, setTheme } = useTheme();

	if (!mounted) return null;

	return (
		<div className={cn("flex items-center justify-center gap-x-2", className)}>
			<span className="text-sm font-medium">Tema</span>
			<Switch
				checked={theme === "dark"}
				onCheckedChange={() => {
					setTheme(theme === "dark" ? "light" : "dark");
				}}
			/>
		</div>
	);
}
