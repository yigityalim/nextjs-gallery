import { z } from "zod";

export const categorySchema = z.object({
	name: z.string().min(1, "Kategori adı gereklidir"),
	slug: z
		.string()
		.min(1, "Slug gereklidir")
		.regex(
			/^[a-z0-9]+(?:-[a-z0-9]+)*$/,
			"Slug sadece küçük harfler, sayılar ve tire içerebilir",
		),
	description: z.string().optional(),
});

export const productSchema = z.object({
	name: z.string().min(1, "Ürün adı gereklidir"),
	slug: z
		.string()
		.min(1, "Slug gereklidir")
		.regex(
			/^[a-z0-9]+(?:-[a-z0-9]+)*$/,
			"Slug sadece küçük harfler, sayılar ve tire içerebilir",
		),
	description: z.string().optional(),
	price: z.number().int().positive("Fiyat pozitif bir sayı olmalıdır"),
	category_id: z.number().int().positive("Kategori seçilmelidir"),
});

export const productImageSchema = z.object({
	product_id: z.number().int().positive("Ürün seçilmelidir"),
	image_path: z.string().min(1, "Görsel yolu gereklidir"),
	is_main: z.boolean().default(false),
});

// Tip tanımlamaları
export type Category = z.infer<typeof categorySchema> & {
	id: number;
	created_at: string;
	updated_at: string;
};

export type Product = z.infer<typeof productSchema> & {
	id: number;
	created_at: string;
	updated_at: string;
};

export type ProductImage = z.infer<typeof productImageSchema> & {
	id: number;
	created_at: string;
};
