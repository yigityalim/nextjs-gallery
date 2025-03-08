"use client";

import { TableOfContents } from "@/components/table-of-contents";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import type { Post } from "contentlayer/generated";
import { BookOpen } from "lucide-react";
import * as React from "react";
import { create } from "zustand";

export const useCategoryToc = create<{
	value: string | undefined;
	setValue: (value: string | undefined) => void;
}>()((set) => ({
	value: undefined,
	setValue: (value) => set({ value }),
}));

export function CategoryToc({
	category,
}: Readonly<{
	category: Post;
}>) {
	return (
		<div className="sticky top-(--header-height) z-50 flex items-center justify-center bg-nav-color">
			<Accordion type="single" collapsible>
				<AccordionItem value="item-1">
					<AccordionTrigger className="px-4">
						<div className="flex items-center">
							<BookOpen className="mr-2 size-4 icon-base" />
							<span className="text-sm font-medium">Bu Yazıda Neler Var?</span>
						</div>
					</AccordionTrigger>
					<AccordionContent className="px-4">
						<TableOfContents toc={category.tableOfContents} />
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
}
