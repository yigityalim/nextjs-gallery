import {
	SiFacebook,
	SiInstagram,
	SiX,
	SiYoutube,
} from "@icons-pack/react-simple-icons";
import Image from "next/image";

export const links = [
	{
		name: "facebook",
		href: "https://www.facebook.com/",
		icon: SiFacebook,
	},
	{
		name: "twitter",
		href: "https://twitter.com/",
		icon: SiX,
	},
	{
		name: "youtube",
		href: "https://www.youtube.com/user/",
		icon: SiYoutube,
	},
	{
		name: "instagram",
		href: "https://www.instagram.com/",
		icon: SiInstagram,
	},
	{
		name: "linkedin",
		href: "https://www.linkedin.com/",
		// TODO: Linkedin ikonu değiştir. ortalı durmuyor
		icon: () => (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 50 50"
				width="28"
				height="28"
				fill="currentColor"
			>
				<title>LinkedIn</title>
				<path d="M 9 4 C 6.2504839 4 4 6.2504839 4 9 L 4 41 C 4 43.749516 6.2504839 46 9 46 L 41 46 C 43.749516 46 46 43.749516 46 41 L 46 9 C 46 6.2504839 43.749516 4 41 4 L 9 4 z M 9 6 L 41 6 C 42.668484 6 44 7.3315161 44 9 L 44 41 C 44 42.668484 42.668484 44 41 44 L 9 44 C 7.3315161 44 6 42.668484 6 41 L 6 9 C 6 7.3315161 7.3315161 6 9 6 z M 14 11.011719 C 12.904779 11.011719 11.919219 11.339079 11.189453 11.953125 C 10.459687 12.567171 10.011719 13.484511 10.011719 14.466797 C 10.011719 16.333977 11.631285 17.789609 13.691406 17.933594 A 0.98809878 0.98809878 0 0 0 13.695312 17.935547 A 0.98809878 0.98809878 0 0 0 14 17.988281 C 16.27301 17.988281 17.988281 16.396083 17.988281 14.466797 A 0.98809878 0.98809878 0 0 0 17.986328 14.414062 C 17.884577 12.513831 16.190443 11.011719 14 11.011719 z M 14 12.988281 C 15.392231 12.988281 15.94197 13.610038 16.001953 14.492188 C 15.989803 15.348434 15.460091 16.011719 14 16.011719 C 12.614594 16.011719 11.988281 15.302225 11.988281 14.466797 C 11.988281 14.049083 12.140703 13.734298 12.460938 13.464844 C 12.78117 13.19539 13.295221 12.988281 14 12.988281 z M 11 19 A 1.0001 1.0001 0 0 0 10 20 L 10 39 A 1.0001 1.0001 0 0 0 11 40 L 17 40 A 1.0001 1.0001 0 0 0 18 39 L 18 33.134766 L 18 20 A 1.0001 1.0001 0 0 0 17 19 L 11 19 z M 20 19 A 1.0001 1.0001 0 0 0 19 20 L 19 39 A 1.0001 1.0001 0 0 0 20 40 L 26 40 A 1.0001 1.0001 0 0 0 27 39 L 27 29 C 27 28.170333 27.226394 27.345035 27.625 26.804688 C 28.023606 26.264339 28.526466 25.940057 29.482422 25.957031 C 30.468166 25.973981 30.989999 26.311669 31.384766 26.841797 C 31.779532 27.371924 32 28.166667 32 29 L 32 39 A 1.0001 1.0001 0 0 0 33 40 L 39 40 A 1.0001 1.0001 0 0 0 40 39 L 40 28.261719 C 40 25.300181 39.122788 22.95433 37.619141 21.367188 C 36.115493 19.780044 34.024172 19 31.8125 19 C 29.710483 19 28.110853 19.704889 27 20.423828 L 27 20 A 1.0001 1.0001 0 0 0 26 19 L 20 19 z M 12 21 L 16 21 L 16 33.134766 L 16 38 L 12 38 L 12 21 z M 21 21 L 25 21 L 25 22.560547 A 1.0001 1.0001 0 0 0 26.798828 23.162109 C 26.798828 23.162109 28.369194 21 31.8125 21 C 33.565828 21 35.069366 21.582581 36.167969 22.742188 C 37.266572 23.901794 38 25.688257 38 28.261719 L 38 38 L 34 38 L 34 29 C 34 27.833333 33.720468 26.627107 32.990234 25.646484 C 32.260001 24.665862 31.031834 23.983076 29.517578 23.957031 C 27.995534 23.930001 26.747519 24.626988 26.015625 25.619141 C 25.283731 26.611293 25 27.829667 25 29 L 25 38 L 21 38 L 21 21 z" />
			</svg>
		),
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
							+90 212 212 12 12
						</a>
					</div>
					<div className="w-full flex flex-col gap-4 items-start justify-center mb-6">
						<h5 className="font-lora h5 scroll-mt-24 font-medium text-pretty text-white">
							Adres
						</h5>
						<p className="text-start text-white dark:text-offwhite text-xs leading-relaxed">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
							molestiae optio pariatur quae quasi qui!
						</p>
					</div>
					<div className="w-full flex flex-col gap-4 items-start justify-center mb-6">
						<h5 className="font-lora h5 scroll-mt-24 font-medium text-pretty text-white">
							Bizi Takip Edin
						</h5>
						<div className="flex flex-row gap-4">
							{links.map((link) => (
								<a
									key={link.name}
									href={link.href}
									target="_blank"
									rel="noopener noreferrer"
									className="text-white dark:text-offwhite size-[24px]"
								>
									<link.icon size={24} />
								</a>
							))}
						</div>
					</div>
					<div className="w-full flex flex-col gap-4 items-start justify-center mt-6">
						<p className="text-start text-white dark:text-offwhite text-xs">
							Copyright &copy; {new Date().getFullYear()}{" "}
							<a href="https://www.acme.com" className="text-brand-500">
								ACME
							</a>{" "}
							Tüm Hakları Saklıdır.
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
