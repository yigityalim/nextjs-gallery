import { allPosts } from "contentlayer/generated";

export type Menu = {
	id: string;
	name: string;
	description: string;
	href: string;
	children?: Menu[];
};

export interface TocItem {
	url: string;
	title: string;
	items?: TocItem[];
}

function formatTocItems(items: TocItem[], rootHref = ""): Menu[] {
	return items.map((item, index) => {
		const result: Menu = {
			id: `visky-${index + 1}`,
			name: item.title,
			description: item.title,
			href: `${rootHref}${item.url}`,
		};

		if (item.items && item.items.length > 0) {
			result.children = formatTocItems(item.items);
		}

		return result;
	});
}

export const menu = [
	{
		id: crypto.randomUUID(),
		name: "Viskiler",
		description: "Viski çeşitleri",
		href: "/category/visky",
		children: formatTocItems(
			allPosts[0]?.tableOfContents?.items[0]?.items || [],
			"/category/visky",
		),
	},
	{
		id: crypto.randomUUID(),
		name: "Şaraplar",
		description: "Şarap çeşitleri",
		href: "/saraplar",
		children: [
			{
				id: crypto.randomUUID(),
				name: "Kırmızı şaraplar",
				description: "Kırmızı şaraplar",
				href: "/kirmizi-saraplar",
			},
			{
				id: crypto.randomUUID(),
				name: "Beyaz şaraplar",
				description: "Beyaz şaraplar",
				href: "/beyaz-saraplar",
			},
		],
	},
	{
		id: crypto.randomUUID(),
		name: "Şampanyalar",
		description: "Şampanya çeşitleri",
		href: "/sampanyalar",
		children: [
			{
				id: crypto.randomUUID(),
				name: "Türk şampanyaları",
				description: "Türk şampanyaları",
				href: "/turk-sampanyalari",
			},
			{
				id: crypto.randomUUID(),
				name: "Yabancı şampanyalar",
				description: "Yabancı şampanyalar",
				href: "/yabanci-sampanyalar",
			},
		],
	},
	{
		id: crypto.randomUUID(),
		name: "Konyaklar",
		description: "Konyak çeşitleri",
		href: "/konyaklar",
		children: [
			{
				id: crypto.randomUUID(),
				name: "Türk konyakları",
				description: "Türk konyakları",
				href: "/turk-konyaklari",
			},
			{
				id: crypto.randomUUID(),
				name: "Yabancı konyaklar",
				description: "Yabancı konyaklar",
				href: "/yabanci-konyaklar",
			},
		],
	},
] satisfies Menu[];

export type MenuItem = (typeof menu)[0];
