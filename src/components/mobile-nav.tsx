"use client";

import { NestedDrawer } from "@/components/nested-drawer";
import { Button } from "@/components/ui/button";
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
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

//FIXME: zustand kullan ve nested close eventi çalışsın. şu an çalışmıyor:
export function MobileNav() {
	const [menuState, setMenuState] = useState(false);
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
					<DrawerTitle className="">
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
					<DrawerClose>Menüyü kapat</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}

const menu = [
	{
		id: 1,
		name: "Viskiler",
		description: "Viski çeşitleri",
		href: "/category/visky",
		children: [
			{
				id: 1,
				name: "Türk viskileri",
				description: "Türk viskileri",
				href: "/turk-viskileri",
			},
			{
				id: 2,
				name: "Yabancı viskiler",
				description: "Yabancı viskiler",
				href: "/yabanci-viskiler",
			},
		],
	},
	{
		id: 2,
		name: "Şaraplar",
		description: "Şarap çeşitleri",
		href: "/saraplar",
		children: [
			{
				id: 1,
				name: "Kırmızı şaraplar",
				description: "Kırmızı şaraplar",
				href: "/kirmizi-saraplar",
			},
			{
				id: 2,
				name: "Beyaz şaraplar",
				description: "Beyaz şaraplar",
				href: "/beyaz-saraplar",
			},
		],
	},
	{
		id: 3,
		name: "Şampanyalar",
		description: "Şampanya çeşitleri",
		href: "/sampanyalar",
		children: [
			{
				id: 1,
				name: "Türk şampanyaları",
				description: "Türk şampanyaları",
				href: "/turk-sampanyalari",
			},
			{
				id: 2,
				name: "Yabancı şampanyalar",
				description: "Yabancı şampanyalar",
				href: "/yabanci-sampanyalar",
			},
		],
	},
	{
		id: 4,
		name: "Konyaklar",
		description: "Konyak çeşitleri",
		href: "/konyaklar",
		children: [
			{
				id: 1,
				name: "Türk konyakları",
				description: "Türk konyakları",
				href: "/turk-konyaklari",
			},
			{
				id: 2,
				name: "Yabancı konyaklar",
				description: "Yabancı konyaklar",
				href: "/yabanci-konyaklar",
			},
		],
	},
];
