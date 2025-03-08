import { Mdx } from "@/components/mdx-components";
import { TableOfContents } from "@/components/table-of-contents";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { allPosts } from "contentlayer/generated";
import { BookOpen } from "lucide-react";
import * as React from "react";

export default async function CategoryIdPage({
	params,
}: Readonly<{ params: Promise<{ id: string }> }>) {
	const { id } = await params;

	const category = allPosts.find((post) => post.slugAsParams === id);

	if (!category) {
		return <div>Category not found</div>;
	}

	return (
		<div className="max-w-(--content-width) mx-auto">
			<div className="sticky top-0 z-50 flex items-center justify-center bg-background">
				<Accordion type="single" collapsible>
					<AccordionItem value="item-1">
						<AccordionTrigger className="px-4">
							<div className="flex items-center">
								<BookOpen className="mr-2 size-4 icon-base" />
								<span className="text-sm font-medium">
									Bu Yazıda Neler Var?
								</span>
							</div>
						</AccordionTrigger>
						<AccordionContent className="px-4">
							<TableOfContents toc={category.tableOfContents} />
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
			<div className="px-4 pt-4">
				<Mdx code={category.body.code} />
			</div>
		</div>
	);
}
