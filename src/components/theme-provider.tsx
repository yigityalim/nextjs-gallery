"use client";

import { ThemeProvider, type ThemeProviderProps } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";

interface ProviderProps extends ThemeProviderProps {}

export function Providers({ children }: Readonly<ProviderProps>) {
	return (
		<NuqsAdapter>
			<ThemeProvider
				enableSystem
				enableColorScheme
				attribute="class"
				defaultTheme="system"
				storageKey="theme"
				disableTransitionOnChange
			>
				{children}
			</ThemeProvider>
		</NuqsAdapter>
	);
}
