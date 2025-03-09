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

function formatTocItems(
	items: TocItem[] | undefined,
	rootHref = "",
	prefix = "",
): Menu[] {
	if (!items) return [];

	return items.map((item, index) => {
		const result: Menu = {
			id: `${prefix}-${index + 1}`,
			name: item.title,
			description: item.title,
			href: `${rootHref}${item.url}`,
		};

		if (item.items && item.items.length > 0) {
			result.children = formatTocItems(
				item.items,
				"",
				`${prefix}-${index + 1}`,
			);
		}

		return result;
	});
}

function findPostByTitle(titlePart: string) {
	return allPosts.find((post) =>
		post.title.toLowerCase().includes(titlePart.toLowerCase()),
	);
}

const viskiPost = findPostByTitle("Viski");
const sarapPost = findPostByTitle("Şarap");
const vodkaPost = findPostByTitle("Vodka");

export const menu = [
	{
		id: crypto.randomUUID(),
		name: "Viskiler",
		description: "Viski çeşitleri ve tarihi",
		href: "/category/visky",
		children: formatTocItems(
			viskiPost?.tableOfContents?.items[0]?.items || [],
			"/category/visky",
			"viski",
		),
	},
	{
		id: crypto.randomUUID(),
		name: "Vodkalar",
		description: "Vodka çeşitleri ve kültürü",
		href: "/posts/vodka",
		children: formatTocItems(
			vodkaPost?.tableOfContents?.items[0]?.items || [],
			"/category/vodka",
			"vodka",
		),
	},
	{
		id: crypto.randomUUID(),
		name: "Şaraplar",
		description: "Şarap tarihi, üretimi ve tadımı",
		href: "/category/wine",
		children: formatTocItems(
			sarapPost?.tableOfContents?.items[0]?.items || [],
			"/category/wine",
			"sarap",
		),
	},
] satisfies Menu[];

export type MenuItem = (typeof menu)[0];
