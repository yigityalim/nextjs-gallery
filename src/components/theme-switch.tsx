"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import React from "react";

export function ThemeButton({ className, ...props }: Readonly<ButtonProps>) {
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => setMounted(true), []);

	const { theme, setTheme } = useTheme();

	if (!mounted) return null;

	return (
		<Button
			onClick={() => setTheme(theme === "light" ? "dark" : "light")}
			className={cn(className)}
			{...props}
		>
			{`${theme === "light" ? "Koyu" : "Açık"} Mod`}
		</Button>
	);
}
