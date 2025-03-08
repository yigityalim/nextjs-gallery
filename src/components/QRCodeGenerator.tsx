"use client";

import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Download, Share } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import React, { useRef } from "react";
import { create } from "zustand";

export type QRDrawerStore = {
	isOpen: boolean;
	url: string;
	setUrl: (url: string) => void;
	openDrawer: () => void;
	closeDrawer: () => void;
	toggleDrawer: () => void;
};

export const useQRDrawerStore = create<QRDrawerStore>()((set) => ({
	isOpen: false,
	url: "https://example.com",
	setUrl: (url) => set({ url }),
	openDrawer: () => set({ isOpen: true }),
	closeDrawer: () => set({ isOpen: false }),
	toggleDrawer: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export function QRCodeGenerator() {
	const { isOpen, url, setUrl, openDrawer, closeDrawer } = useQRDrawerStore();
	const qrContainerRef = useRef<HTMLDivElement>(null);
	const pathname = usePathname();
	const params = useSearchParams();

	const handleDownloadDirect = () => {
		const svgElement = qrContainerRef.current?.querySelector("svg");
		if (!svgElement) return;

		setUrl(`http://localhost:3000${pathname}${params.toString()}`);

		const svgData = new XMLSerializer().serializeToString(svgElement);
		const svgBlob = new Blob([svgData], {
			type: "image/svg+xml;charset=utf-8",
		});
		const svgUrl = URL.createObjectURL(svgBlob);

		const img = new Image();
		img.onload = () => {
			const canvas = document.createElement("canvas");
			const pixelRatio = window.devicePixelRatio || 1;
			canvas.width = img.width * pixelRatio;
			canvas.height = img.height * pixelRatio;

			const ctx = canvas.getContext("2d");
			if (!ctx) return;

			ctx.fillStyle = "#FFFFFF";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.scale(pixelRatio, pixelRatio);
			ctx.drawImage(img, 0, 0, img.width, img.height);

			const pngUrl = canvas.toDataURL("image/png");
			const downloadLink = document.createElement("a");
			downloadLink.href = pngUrl;
			downloadLink.download = "qr-code.png";
			document.body.appendChild(downloadLink);
			downloadLink.click();
			document.body.removeChild(downloadLink);

			URL.revokeObjectURL(svgUrl);
		};

		img.onerror = () => {
			console.error("QR kodu yüklenemedi");
			URL.revokeObjectURL(svgUrl);
		};

		img.src = svgUrl;
	};

	const handleShare = async () => {
		if (!navigator.share) {
			if (navigator.clipboard) {
				await navigator.clipboard.writeText(url);
				alert("URL kopyalandı!");
			}
			return;
		}

		try {
			await navigator.share({
				title: "QR Kod",
				text: "QR Kodum",
				url: url,
			});
		} catch (error) {
			console.error("Paylaşım hatası:", error);
		}
	};

	return (
		<Drawer
			open={isOpen}
			onOpenChange={(open) => (open ? openDrawer() : closeDrawer())}
		>
			<DrawerTrigger asChild>
				<Button size="icon">
					<Share className="h-4 w-4" />
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>QR Kod Üreteci</DrawerTitle>
					<DrawerDescription className="sr-only">
						QR kodunuzu oluşturun.
					</DrawerDescription>
				</DrawerHeader>

				<div className="p-4">
					<div
						ref={qrContainerRef}
						data-qr-container
						className="flex flex-col items-center justify-center bg-white rounded-lg aspect-square"
					>
						<QRCodeSVG
							value={url}
							size={256}
							bgColor={"#ffffff"}
							fgColor={"#000000"}
						/>
					</div>

					<div className="flex justify-center gap-4 mt-4">
						<Button
							onClick={handleDownloadDirect}
							className="flex items-center gap-2"
						>
							<Download className="size-4" />
							İndir
						</Button>

						<Button onClick={handleShare} className="flex items-center gap-2">
							<Share className="size-4" />
							Paylaş
						</Button>
					</div>
				</div>

				<DrawerFooter>
					<p className="text-sm text-gray-500 text-center mb-4">
						QR Kodu indirmek için İndir butonunu kullanın veya Paylaş butonunu
						kullanarak oluşturulan qr kodu paylaşabilirsiniz.
					</p>
					<DrawerClose asChild>
						<Button>Kapat</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
