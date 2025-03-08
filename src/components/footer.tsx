import { ThemeButton } from "@/components/theme-switch";
import Image from "next/image";

export function Footer() {
	return (
		<footer className="w-full">
			<div className="bg-brand-600">
				<div className="container mx-auto py-10 px-4 ">
					<div className="w-full flex items-center justify-center mb-6">
						<Image src="/brand-logo.png" alt="Logo" width={100} height={100} />
					</div>
					<ThemeButton />
				</div>
			</div>
		</footer>
	);
}
