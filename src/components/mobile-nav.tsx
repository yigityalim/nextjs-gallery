"use client";

import { NestedDrawer } from "@/components/nested-drawer";
import { ThemeButton } from "@/components/theme-switch";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { menu } from "@/lib/menu";
import { useConfig } from "@/lib/state";
import { X } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export function MobileNav() {
	const menuState = useConfig((state) => state.menuState);
	const setMenuState = useConfig((state) => state.setMenuState);
	return (
		<Drawer open={menuState} onOpenChange={setMenuState}>
			<DrawerTrigger className="absolute top-1/2 -translate-y-1/2 left-16">
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="size-[18px] icon-base"
				>
					<title>Menü</title>
					<motion.line
						x1="4"
						x2="20"
						y1="6"
						y2="6"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						animate={menuState ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
						transition={{ duration: 0.3 }}
					/>
					<motion.line
						x1="4"
						x2="20"
						y1="12"
						y2="12"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						animate={menuState ? { opacity: 0 } : { opacity: 1 }}
						transition={{ duration: 0.3 }}
					/>
					<motion.line
						x1="4"
						x2="20"
						y1="18"
						y2="18"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						animate={menuState ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
						transition={{ duration: 0.3 }}
					/>
				</svg>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="flex flex-col gap-2">
					<DrawerTitle className="pt-4">
						<Link href="/">
							<Image
								src="/brand-logo.png"
								alt="atu-duty-free"
								width={100}
								height={100}
								priority
								quality={100}
							/>
						</Link>
					</DrawerTitle>
					<DrawerDescription className="sr-only">Menü</DrawerDescription>
					<nav className="flex flex-col space-y-4 w-full items-start justify-start">
						{menu.map((item) => (
							<div key={item.id} className="w-full">
								{item.children ? (
									<NestedDrawer item={item} />
								) : (
									<Link
										href={item.href}
										className="flex items-center justify-between gap-2 p-2.5 rounded-sm text-sm text-offgray-600 dark:text-offgray-200 hover:bg-offgray-100/50 dark:hover:bg-offgray-500/10 transition-colors duration-75"
										onClick={() => setMenuState(false)}
									>
										{item.name}
									</Link>
								)}
							</div>
						))}
					</nav>
				</DrawerHeader>
				<DrawerFooter>
					<ThemeButton />
					<DrawerClose>
						<X className="size-[14px] text-offgray-800 dark:text-offgray-300" />
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
