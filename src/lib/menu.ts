export const menu = [
	{
		id: 1,
		name: "Viskiler",
		description: "Viski çeşitleri",
		href: "/category/visky",
		children: [
			{
				id: 1,
				name: "Türk viskileri",
				description: "Türk viskileri",
				href: "/turk-viskileri",
			},
			{
				id: 2,
				name: "Yabancı viskiler",
				description: "Yabancı viskiler",
				href: "/yabanci-viskiler",
			},
		],
	},
	{
		id: 2,
		name: "Şaraplar",
		description: "Şarap çeşitleri",
		href: "/saraplar",
		children: [
			{
				id: 1,
				name: "Kırmızı şaraplar",
				description: "Kırmızı şaraplar",
				href: "/kirmizi-saraplar",
			},
			{
				id: 2,
				name: "Beyaz şaraplar",
				description: "Beyaz şaraplar",
				href: "/beyaz-saraplar",
			},
		],
	},
	{
		id: 3,
		name: "Şampanyalar",
		description: "Şampanya çeşitleri",
		href: "/sampanyalar",
		children: [
			{
				id: 1,
				name: "Türk şampanyaları",
				description: "Türk şampanyaları",
				href: "/turk-sampanyalari",
			},
			{
				id: 2,
				name: "Yabancı şampanyalar",
				description: "Yabancı şampanyalar",
				href: "/yabanci-sampanyalar",
			},
		],
	},
	{
		id: 4,
		name: "Konyaklar",
		description: "Konyak çeşitleri",
		href: "/konyaklar",
		children: [
			{
				id: 1,
				name: "Türk konyakları",
				description: "Türk konyakları",
				href: "/turk-konyaklari",
			},
			{
				id: 2,
				name: "Yabancı konyaklar",
				description: "Yabancı konyaklar",
				href: "/yabanci-konyaklar",
			},
		],
	},
];

export type MenuItem = (typeof menu)[0];
