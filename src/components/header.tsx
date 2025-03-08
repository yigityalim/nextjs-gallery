import { MobileNav } from "@/components/mobile-nav";
import Image from "next/image";
import Link from "next/link";

export function Header() {
	return (
		<div className="relative w-full  flex items-center justify-center mb-6 py-2 border-b border-brand-500">
			<MobileNav />
			<Link href="/" className="">
				<Image
					src="/brand-logo.png"
					alt="atu-duty-free"
					width={80}
					height={80}
					priority
					quality={100}
				/>
			</Link>
		</div>
	);
}
