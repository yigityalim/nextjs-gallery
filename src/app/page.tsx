import { QrcodeGenerator } from "@/components/qrcode-generator";
import { allPosts } from "contentlayer/generated";
import { Link } from "next-view-transitions";
import Image from "next/image";
import * as React from "react";

export default async function Home() {
	return (
		<main className="container mx-auto pb-10 px-4 pt-8 flex flex-col gap-4 md:px-8 md:pt-12">
			<QrcodeGenerator />
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
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
							<h2 className="h2 font-bold font-lora text-brand-600 dark:text-brand-500 italic mb-4">
								{post.title}
							</h2>
							<p>{post.description}</p>
						</div>
					</Link>
				))}
			</div>
		</main>
	);
}
