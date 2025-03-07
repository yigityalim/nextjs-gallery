import { GalleryGrid } from "@/components/gallery-grid";
import Image from "next/image";

export default function Home() {
	return (
		<main className="container mx-auto min-h-[calc(100dvh-300px)] py-10 px-4">
			<GalleryGrid />
		</main>
	);
}
