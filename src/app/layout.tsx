import type { Metadata, Viewport } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Providers } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import type React from "react";

const lora = Lora({
	display: "swap",
	variable: "--font-lora",
	subsets: ["latin"],
});

export const metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
} satisfies Metadata;

export const viewport = {
	minimumScale: 1,
	maximumScale: 1,
	initialScale: 1,
	userScalable: false,
	width: "device-width",
	height: "device-height",
	viewportFit: "cover",
} satisfies Viewport;

export default function RootLayout({
	children,
	modal,
}: Readonly<
	React.PropsWithChildren<{
		modal: React.ReactNode;
	}>
>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				suppressHydrationWarning
				className={cn(
					"bg-cream-100/20 text-offgray dark:text-offgray-300 relative min-h-screen w-screen overflow-x-hidden dark:bg-[hsl(218,_13%,_8%)]",
					lora.variable,
				)}
			>
				<Providers>
					<Header />
					{children}
					{modal}
					<Footer />
				</Providers>
			</body>
		</html>
	);
}
