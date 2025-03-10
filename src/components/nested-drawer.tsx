"use client";

import {
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerNested,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import type { Menu } from "@/lib/menu";
import { useConfig } from "@/lib/state";
import { cn } from "@/lib/utils";
import { ChevronRight, X } from "lucide-react";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { useState } from "react";

export interface NestedDrawerProps {
	item: Menu;
}

export function NestedDrawer({ item }: Readonly<NestedDrawerProps>) {
	//const Icon = item.icon; -> {Icon && <Icon className="size-[14px] icon-base" />}
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);
	const closeAllMenus = useConfig((state) => state.closeAllMenus);

	const handleCloseMenus = () => {
		setIsOpen(false);
		closeAllMenus();
	};

	return (
		<DrawerNested
			open={isOpen}
			onOpenChange={setIsOpen}
			shouldScaleBackground={false}
		>
			<DrawerTrigger asChild>
				<div
					key={item.name}
					className={cn(
						"w-full flex items-center justify-between rounded dark:text-offgray-50 hover:bg-offgray-100/50 dark:hover:bg-offgray-500/10 h-8 gap-3 px-2.5 text-sm tracking-tight text-nowrap text-black transition-colors duration-75 select-none cursor-pointer",
						pathname === item.href
							? "bg-offgray-100/50 dark:bg-offgray-500/10"
							: "",
					)}
				>
					<Link
						onClick={handleCloseMenus}
						href={item.href}
						className="w-1/2 inline-flex items-center justify-start uppercase font-bold tracking-widest"
					>
						{item.name}
					</Link>
					<button
						type="button"
						className="w-1/2 inline-flex items-center justify-end"
						onClick={(e) => setIsOpen(true)}
					>
						<ChevronRight className="size-[14px] icon-base" />
					</button>
				</div>
			</DrawerTrigger>
			<DrawerContent z={204} className="">
				<DrawerHeader className={cn("border-0", item.name ? "" : "p-0")}>
					<DrawerTitle className="text-lg font-bold text-offgray-600 dark:text-offgray-200">
						{item.name}
					</DrawerTitle>
					<DrawerDescription className="sr-only">Alt menü</DrawerDescription>
				</DrawerHeader>
				<nav className="flex flex-col gap-2 overflow-y-auto p-2.5">
					{item.children?.map((child) => (
						<Link
							key={child.id}
							href={child.href}
							className={cn(
								"flex items-center justify-between gap-2 p-2.5 rounded-sm text-sm text-offgray-600 dark:text-offgray-200 hover:bg-offgray-100/50 dark:hover:bg-offgray-500/10 transition-colors duration-75",
								window.location.hash === `#${child.href.split("#")[1]}`
									? "bg-offgray-100/50 dark:bg-offgray-500/10"
									: "",
							)}
							onClick={handleCloseMenus}
						>
							{child.name}
						</Link>
					))}
				</nav>
				<DrawerFooter>
					<DrawerClose>
						<X className="size-[14px] text-offgray-800 dark:text-offgray-300" />
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</DrawerNested>
	);
}
