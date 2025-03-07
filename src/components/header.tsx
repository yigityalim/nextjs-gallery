import Image from "next/image";
import Link from "next/link";

export function Header() {
	return (
		<Link
			href="/"
			className="w-full flex items-center justify-center mb-6 pt-12 lg:pt-16"
		>
			<Image
				src="/brand-logo.png"
				alt="atu-duty-free"
				width={100}
				height={100}
				priority
				quality={100}
			/>
		</Link>
	);
}
