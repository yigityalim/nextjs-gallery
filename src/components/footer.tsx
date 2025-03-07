import { ThemeButton } from "@/components/theme-switch";

export function Footer() {
	return (
		<footer className="w-full">
			<div className="bg-brand-600">
				<div className="container mx-auto py-10 px-4 ">
					<div className="w-full flex items-center justify-between mb-6">
						<h1 className="text-3xl font-bold font-lora text-white dark:text-brand-100">
							Galeri
						</h1>
						<a
							href="/"
							className="text-white dark:text-brand-100 hover:underline"
						>
							Berk Özlen
						</a>
					</div>
					<ThemeButton />
				</div>
			</div>
		</footer>
	);
}
