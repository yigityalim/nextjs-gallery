import ImageModal from "@/components/image-modal";
import { getPhotos } from "@/lib/image";

export default async function PhotoModal({
	params,
}: Readonly<{ params: Promise<{ id: string }> }>) {
	const [photo] = await getPhotos((await params).id);

	if (!photo) {
		return null;
	}

	return (
		<ImageModal
			src={photo.src || "/placeholder.svg"}
			alt={photo.alt}
			title={photo.title}
			description={photo.description}
		/>
	);
}
