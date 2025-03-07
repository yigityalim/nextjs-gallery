import { Mdx } from "@/components/mdx-components";
import { allPosts } from "contentlayer/generated";

export default async function CategoryIdPage({ params }) {
	const { id } = await params;

	console.log(allPosts);

	const category = allPosts.find((post) => post.slugAsParams === id);

	if (!category) {
		return <div>Category not found</div>;
	}

	return (
		<div className="px-4">
			<Mdx code={category.body.code} />
		</div>
	);
}
