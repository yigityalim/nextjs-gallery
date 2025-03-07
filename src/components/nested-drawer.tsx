//@ts-nocheck
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
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type React from "react";

export interface NestedDrawerProps {
	item: any;
}

export function NestedDrawer({ item }: Readonly<NestedDrawerProps>) {
	const Icon = item.icon;

	return (
		<DrawerNested shouldScaleBackground={false}>
			<DrawerTrigger asChild>
				<span
					key={item.name}
					className="w-full flex items-center justify-between dark:text-offgray-50 hover:bg-offgray-100/50 dark:hover:bg-offgray-500/10 flex h-8 gap-3 gap-x-2 rounded-sm border border-transparent px-2.5 text-sm tracking-tight text-nowrap text-black transition-colors duration-75 select-none disabled:cursor-not-allowed disabled:opacity-50"
				>
					{Icon && <Icon className="size-[14px] icon-base" />}
					<Link className="w-1/2" href={item.href}>
						{item.name}
					</Link>
					<span className="w-1/2 inline-flex items-center justify-end">
						<ChevronRight className="size-[14px] icon-base" />
					</span>
				</span>
			</DrawerTrigger>
			<DrawerContent z={204}>
				<DrawerHeader className={cn(item.title ? "" : "border-0 p-0")}>
					<DrawerTitle
						className={cn(
							item.title
								? "w-full text-offgray-600 dark:text-offgray-200 inline-flex items-center justify-between text-lg font-bold"
								: "sr-only",
						)}
						asChild
					>
						<span>{item.title}</span>
					</DrawerTitle>
					<DrawerDescription className="sr-only">Alt menü</DrawerDescription>
				</DrawerHeader>
				<nav className="flex flex-1 flex-col gap-2 overflow-y-auto p-2.5">
					{item.children?.map((child) => (
						<Link
							key={child.id}
							href={child.href}
							passHref
							className="flex items-center justify-between gap-2 p-2.5 rounded-sm text-sm text-offgray-600 dark:text-offgray-200 hover:bg-offgray-100/50 dark:hover:bg-offgray-500/10 transition-colors duration-75"
						>
							{child.name}
							<ChevronRight className="size-[14px] icon-base" />
						</Link>
					))}
				</nav>
				<DrawerFooter>
					<DrawerClose>closeSubMenu</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</DrawerNested>
	);
}
