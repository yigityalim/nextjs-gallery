import { allPosts } from "contentlayer/generated";
import Link from "next/link";

export default function Home() {
	return (
		<main className="container mx-auto min-h-[calc(100dvh-300px)] py-10 px-4">
			{allPosts.map((post) => (
				<Link key={post.slug} href={`/category/${post.slugAsParams}`}>
					<h2>{post.title}</h2>
					<p>{post.slug}</p>
				</Link>
			))}
		</main>
	);
}
