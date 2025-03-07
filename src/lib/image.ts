export type Image = {
	id: string;
	src: string;
	alt: string;
	title: string;
	description: string;
};

const images = [
	{
		id: "1",
		src: "/placeholder.svg?height=300&width=400",
		alt: "Gallery image 1",
		title: "Photo 1",
		description: "This is the description for photo 1.",
	},
	{
		id: "2",
		src: "/placeholder.svg?height=300&width=400",
		alt: "Gallery image 2",
		title: "Photo 2",
		description: "This is the description for photo 2.",
	},
	{
		id: "3",
		src: "/placeholder.svg?height=300&width=400",
		alt: "Gallery image 3",
		title: "Photo 3",
		description: "This is the description for photo 3.",
	},
	{
		id: "4",
		src: "/placeholder.svg?height=300&width=400",
		alt: "Gallery image 4",
		title: "Photo 4",
		description: "This is the description for photo 4.",
	},
	{
		id: "5",
		src: "/placeholder.svg?height=300&width=400",
		alt: "Gallery image 5",
		title: "Photo 5",
		description: "This is the description for photo 5.",
	},
	{
		id: "6",
		src: "/placeholder.svg?height=300&width=400",
		alt: "Gallery image 6",
		title: "Photo 6",
		description: "This is the description for photo 6.",
	},
	{
		id: "7",
		src: "/placeholder.svg?height=300&width=400",
		alt: "Gallery image 7",
		title: "Photo 7",
		description: "This is the description for photo 7.",
	},
	{
		id: "8",
		src: "/placeholder.svg?height=300&width=400",
		alt: "Gallery image 8",
		title: "Photo 8",
		description: "This is the description for photo 8.",
	},
	{
		id: "9",
		src: "/placeholder.svg?height=300&width=400",
		alt: "Gallery image 9",
		title: "Photo 9",
		description: "This is the description for photo 9.",
	},
	{
		id: "10",
		src: "/placeholder.svg?height=300&width=400",
		alt: "Gallery image 10",
		title: "Photo 10",
		description: "This is the description for photo 10.",
	},
];

const getPhotos = async (id?: string): Promise<Image[]> => {
	"use cache";
	if (!id) return [...images];

	const photo = images.find((img) => img.id === id);

	if (!photo)
		return [
			{
				id: "not_found",
				src: "/placeholder.svg?height=300&width=400",
				alt: "Gallery image not found",
				title: "Photo not found",
				description: "The photo you are looking for does not exist.",
			},
		];

	return [photo];
};

export { getPhotos };
