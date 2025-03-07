//@ts-nocheck
import { getProducts } from "@/supabase/queries/product";
import Image from "next/image";
import Link from "next/link";

export async function GalleryGrid() {
	const images = await getProducts();

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-4 xl:gap-6">
			{images.map((image) => (
				<Link
					key={image.id}
					href={`/photos/${image.id}`}
					className="block overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
				>
					<div className="overflow-hidden">
						<Image
							src={image.src || "/placeholder.svg"}
							alt={image.alt}
							width={400}
							height={300}
							className="w-full h-auto object-cover aspect-[4/3] transition-transform duration-300 hover:scale-105"
							priority
						/>
						<h1>{image.name}</h1>
					</div>
				</Link>
			))}
		</div>
	);
}
