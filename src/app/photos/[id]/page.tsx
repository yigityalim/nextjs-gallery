import { getPhotos } from "@/lib/image";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export default async function PhotoPage({
	params,
}: Readonly<{ params: Promise<{ id: string }> }>) {
	const [photo] = await getPhotos((await params).id);

	if (!photo) {
		redirect("/");
	}

	return (
		<div className="container mx-auto py-10 px-4">
			<Link
				href="/"
				className="text-brand-600 dark:text-brand-300 hover:underline mb-6 inline-flex items-center justify-center gap-x-2"
			>
				<ArrowLeft className="icon-base" /> Galeriye Dön
			</Link>

			<div className="max-w-4xl mx-auto">
				<Image
					src={photo.src || "/placeholder.svg"}
					alt={photo.alt}
					width={800}
					height={600}
					className="w-full h-auto rounded-lg shadow-lg"
				/>

				<div className="mt-6">
					<h1 className="h1 font-lora italic text-brand-600 dark:text-brand-300 font-bold">
						{photo.title}
					</h1>
					<p className="mt-2 text-gray-600">{photo.description}</p>
				</div>
			</div>
		</div>
	);
}
