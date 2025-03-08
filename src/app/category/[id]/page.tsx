import { QRCodeGenerator } from "@/components/QRCodeGenerator";
import { CategoryToc } from "@/components/category-toc";
import { Mdx } from "@/components/mdx-components";
import { allPosts } from "contentlayer/generated";
import * as React from "react";

export default async function CategoryIdPage({
	params,
}: Readonly<{ params: Promise<{ id: string }> }>) {
	const { id } = await params;

	const category = allPosts.find((post) => post.slugAsParams === id);

	if (!category) {
		return <div>Category not found</div>;
	}

	console.log(category.tableOfContents);

	return (
		<div className="max-w-(--content-width) mx-auto">
			<CategoryToc category={category} />
			<div className="px-4 pt-4">
				<QRCodeGenerator />
				<Mdx code={category.body.code} />
			</div>
		</div>
	);
}
