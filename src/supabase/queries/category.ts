import type {
	Category,
	Product,
	categorySchema,
	productSchema,
} from "@/supabase/schema";
import type { z } from "zod";
import { createClient } from "../server";

// SELECT: Tüm kategorileri getir
export async function getCategories() {
	const supabase = await createClient();
	const { data, error } = await supabase
		.from("categories")
		.select("*")
		.order("name");

	if (error) throw new Error(error.message);
	return data as Category[];
}

// SELECT: Tek bir kategori getir
export async function getCategoryBySlug(slug: string) {
	const supabase = await createClient();
	const { data, error } = await supabase
		.from("categories")
		.select("*")
		.eq("slug", slug)
		.single();

	if (error) throw new Error(error.message);
	return data as Category;
}

// INSERT: Yeni kategori ekle
export async function createCategory(
	categoryData: z.infer<typeof categorySchema>,
) {
	const supabase = await createClient();
	const { data, error } = await supabase
		.from("categories")
		.insert([categoryData])
		.select()
		.single();

	if (error) throw new Error(error.message);
	return data as Category;
}

// UPDATE: Kategori güncelle
export async function updateCategory(
	id: number,
	categoryData: Partial<z.infer<typeof categorySchema>>,
) {
	const supabase = await createClient();
	const { data, error } = await supabase
		.from("categories")
		.update(categoryData)
		.eq("id", id)
		.select()
		.single();

	if (error) throw new Error(error.message);
	return data as Category;
}

// DELETE: Kategori sil
export async function deleteCategory(id: number) {
	const supabase = await createClient();
	const { error } = await supabase.from("categories").delete().eq("id", id);

	if (error) throw new Error(error.message);
	return true;
}

export async function searchCategories(search: string) {
	const supabase = await createClient();
	const { data, error } = await supabase
		.from("categories")
		.select("*")
		.textSearch("name", search)
		.order("name");

	if (error) throw new Error(error.message);
	return data as Category[];
}

export async function getCategoriesWithProducts() {
	const supabase = await createClient();
	const { data, error } = await supabase
		.from("categories")
		.select(
			`
            *,
            products: products(*)
            `,
		)
		.order("name");

	if (error) throw new Error(error.message);
	return data as Category[];
}

export async function getCategoryWithProducts(slug: string) {
	const supabase = await createClient();
	const { data, error } = await supabase
		.from("categories")
		.select(
			`
            *,
            products: products(*)
            `,
		)
		.eq("slug", slug)
		.single();

	if (error) throw new Error(error.message);
	return data as Category;
}
