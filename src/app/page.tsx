import { GalleryGrid } from "@/components/gallery-grid";

export default function Home() {
	return (
		<main className="container mx-auto py-10 px-4">
			<div className="w-full flex items-center justify-between mb-6">
				<h1 className="text-3xl font-bold font-lora text-brand-600 dark:text-brand-300">
					Galeri
				</h1>
				<a
					href="#"
					className="text-blue-600 dark:text-brand-300 hover:underline"
				>
					Berk Özlen
				</a>
			</div>
			<GalleryGrid />
		</main>
	);
}
