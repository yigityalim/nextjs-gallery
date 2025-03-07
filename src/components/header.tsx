import { MobileNav } from "@/components/mobile-nav";
import Image from "next/image";
import Link from "next/link";

export function Header() {
	return (
		<div className="relative w-full flex items-center justify-center mb-6 py-4 border-b border-brand-500">
			<MobileNav />
			<Link href="/">
				<Image
					src="/brand-logo.png"
					alt="atu-duty-free"
					width={100}
					height={100}
					priority
					quality={100}
				/>
			</Link>
		</div>
	);
}
