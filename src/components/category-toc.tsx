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

export function CategoryToc({
	category,
}: Readonly<{
	category: Post;
}>) {
	const [isOpen, setIsOpen] = React.useState<string | undefined>(undefined);

	return (
		<div className="fixed top-(--header-height) w-full z-50 backdrop-blur-md dark:backdrop-blur-xl flex items-center justify-center bg-nav-color">
			<Accordion
				type="single"
				collapsible
				value={isOpen}
				onValueChange={setIsOpen}
			>
				<AccordionItem value="item-1">
					<AccordionTrigger className="px-4">
						<div className="flex items-center">
							<BookOpen className="mr-2 size-4 icon-base" />
							<span className="text-sm font-medium">Bu Yazıda Neler Var?</span>
						</div>
					</AccordionTrigger>
					<AccordionContent className="px-4">
						<TableOfContents
							onValueChange={setIsOpen}
							toc={category.tableOfContents}
						/>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
}
