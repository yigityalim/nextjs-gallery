import {
	SiFacebook,
	SiInstagram,
	SiX,
	SiYoutube,
} from "@icons-pack/react-simple-icons";
import Image from "next/image";

export const links = [
	{
		name: "github",
		href: "https://github.com/",
		icon: SiFacebook,
	},
	{
		name: "twitter",
		href: "https://x.com/yigit_yalim",
		icon: SiX,
	},
	{
		name: "youtube",
		href: "https://www.youtube.com/channel/UCXyfYv6nkg7lXw2b4Zw6Y5A",
		icon: SiYoutube,
	},
	{
		name: "instagram",
		href: "https://www.instagram.com/mehmet_yigit_yalim/",
		icon: SiInstagram,
	},
] as const;

export function Footer() {
	return (
		<footer className="w-full">
			<div className="bg-footer dark:bg-offgray-950">
				<div className="container mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-3">
					<div className="w-full flex items-center justify-start mb-6">
						<Image src="/brand-logo.png" alt="Logo" width={100} height={100} />
					</div>
					<div className="w-full flex flex-col gap-4 items-start justify-center mb-6">
						<h5 className="font-lora h5 scroll-mt-24 font-medium text-pretty text-white">
							İletişime Geçin
						</h5>
						<a
							href="tel:+902124654327"
							className="text-center text-white dark:text-offwhite text-xs"
						>
							+90 212 465 43 27
						</a>
					</div>
					<div className="w-full flex flex-col gap-4 items-start justify-center mb-6">
						<h5 className="font-lora h5 scroll-mt-24 font-medium text-pretty text-white">
							Adres
						</h5>
						<p className="text-start text-white dark:text-offwhite text-xs">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid
							debitis esse harum nostrum, pariatur quisquam soluta? Incidunt
							numquam unde voluptates.
						</p>
					</div>
					<div className="w-full flex flex-col gap-4 items-start justify-center mb-6">
						<h5 className="font-lora h5 scroll-mt-24 font-medium text-pretty text-white">
							Bizi Takip Edin
						</h5>
						<div className="flex flex-row gap-6">
							{links.map((link) => (
								<a
									key={link.name}
									href={link.href}
									target="_blank"
									rel="noopener noreferrer"
									className="text-white dark:text-offwhite size-[14px]"
								>
									<link.icon size={24} />
								</a>
							))}
						</div>
					</div>
					<div className="w-full flex flex-col gap-4 items-start justify-center mt-6">
						<p className="text-start text-white dark:text-offwhite text-xs">
							Copyright &copy; {new Date().getFullYear()}{" "}
							<a href="https://www.atu.com.tr" className="text-brand-500">
								ATU
							</a>{" "}
							Tüm Hakları Saklıdır.
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
