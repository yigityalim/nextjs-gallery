"use client";

import type { TableOfContents as TOC } from "@/lib/toc";
import { cn } from "@/lib/utils";
import { BookOpen } from "lucide-react";
import * as React from "react";
import { useCallback } from "react";

interface TocProps {
	toc: TOC;
}

export function TableOfContents({ toc }: Readonly<TocProps>) {
	const tocRef = React.useRef<HTMLDivElement>(null);
	const itemIds = React.useMemo(
		() =>
			toc.items
				? toc.items
						.flatMap((item) => [item.url, item?.items?.map((item) => item.url)])
						.flat()
						.filter(Boolean)
						.map((id) => id?.split("#")[1])
				: [],
		[toc],
	);

	const activeHeading = useActiveItem(itemIds as string[], tocRef);

	if (!toc?.items?.length) {
		return null;
	}

	return (
		<div
			ref={tocRef}
			className="relative w-full max-h-[700px] overflow-y-auto pr-2 scrollbar-hidden"
		>
			<Tree tree={toc} activeItem={activeHeading} />
		</div>
	);
}

function useActiveItem(
	itemIds: string[],
	tocRef: React.RefObject<HTMLDivElement | null>,
) {
	const [activeId, setActiveId] = React.useState<string | null>(null);

	React.useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const element of entries) {
					if (element.isIntersecting) {
						setActiveId(element.target.id);
					}
				}
			},
			{ rootMargin: "0% 0% -80% 0%" },
		);

		for (const id of itemIds) {
			const element = document.getElementById(id);
			if (element) {
				observer.observe(element);
			}
		}

		return () => {
			for (const id of itemIds) {
				const element = document.getElementById(id);
				if (element) {
					observer.unobserve(element);
				}
			}
		};
	}, [itemIds]);

	React.useEffect(() => {
		if (activeId && tocRef.current) {
			const activeElement = tocRef.current.querySelector(
				`.toc-link[href="#${activeId}"]`,
			);
			activeElement?.scrollIntoView({
				behavior: "smooth",
				block: "nearest",
				inline: "nearest",
			});
		}
	}, [activeId, tocRef]);

	return activeId;
}

interface TreeProps {
	tree: TOC;
	level?: number;
	activeItem?: string | null;
}

function Tree({ tree, level = 1, activeItem }: TreeProps) {
	const scroll = useCallback<(id: string) => void>((id) => {
		document.getElementById(id)?.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
	}, []);

	return tree?.items?.length && level < 3 ? (
		<ul className="mt-2 space-y-2">
			{tree.items.map((item, index) => {
				return (
					<li key={`${index}-${item.url.split("#")[1]}`}>
						<a
							href={item.url}
							onClick={(e) => {
								e.preventDefault();
								scroll(item.url.split("#")[1]);
							}}
							className={cn(
								"toc-link inline transition-colors duration-300 text-sm",
								item.url === `#${activeItem}`
									? "font-medium text-brand-600 underline dark:text-brand-300 decoration-accent-brand/20 hover:decoration-accent-brand/80 dark:decoration-brand-300/20 dark:hover:decoration-brand-400/80"
									: "text-offgray-700 hover:text-accent-brand dark:hover:text-brand-300",
							)}
						>
							{item.title}
						</a>
						{item.items?.length ? (
							<ul
								className={cn(
									"ml-[7px] pl-4 mt-1 space-y-1 border-l border-offgray-100 dark:border-offgray-600/20",
								)}
							>
								<Tree
									tree={{ items: item.items }}
									level={level + 1}
									activeItem={activeItem}
								/>
							</ul>
						) : null}
					</li>
				);
			})}
		</ul>
	) : null;
}
