import { allPosts } from "contentlayer/generated";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
	return (
		<main className="container mx-auto py-10 px-4 flex flex-col gap-4">
			{allPosts.map((post) => (
				<Link
					href={`/category/${post.slugAsParams}`}
					key={post.slug}
					className="pt-4"
				>
					{post.cover && (
						<Image
							src={post.cover.replace("\r", "")}
							alt={post.cover}
							width={1920}
							height={1080}
							className="cursor-pointer object-cover aspect-video rounded"
						/>
					)}
					<div className="mt-4">
						<h2 className="h2 font-bold font-lora text-brand-600 dark:text-brand-300 italic mb-4">
							{post.title}
						</h2>
						<p>{post.description}</p>
					</div>
				</Link>
			))}
		</main>
	);
}
