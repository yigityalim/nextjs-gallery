"use client";

import { MobileNav } from "@/components/mobile-nav";
import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function Header() {
	const pathname = usePathname();
	return (
		<div
			className={cn(
				"header backdrop-blur-md dark:backdrop-blur-xl fixed h-(--header-height) z-50 bg-nav-color top-0 w-full flex items-center justify-center mb-6 py-2 border-b border-brand-500/50 dark:border-brand-600/20",
				pathname.startsWith("/category") && "border-b-0",
			)}
		>
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
