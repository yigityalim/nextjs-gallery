"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type ImageModalProps = {
	src: string;
	alt: string;
	title: string;
	description: string;
};

export default function ImageModal({
	src,
	alt,
	title,
	description,
}: ImageModalProps) {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);

	// Open modal when component mounts
	useEffect(() => {
		setIsOpen(true);
	}, []);

	// Handle closing with animation
	const handleClose = () => {
		setIsOpen(false);
		setTimeout(() => {
			router.back();
		}, 100); // Reduced timeout as shadcn handles animations
	};

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(open) => {
				if (!open) handleClose();
			}}
		>
			<DialogContent className="sm:max-w-4xl p-0 overflow-hidden rounded-t-md">
				<div className="relative">
					<Image
						src={src || "/placeholder.svg"}
						alt={alt}
						width={800}
						height={600}
						className="w-full h-auto rounded-md"
						priority
					/>
				</div>
				<DialogTitle className="text-xl">{title}</DialogTitle>
				<DialogDescription className="text-gray-600">
					{description}
				</DialogDescription>
			</DialogContent>
		</Dialog>
	);
}
