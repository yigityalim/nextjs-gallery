import type { z } from "zod";
import type { Product, productSchema } from "../schema";
import { createClient } from "../server";

// SELECT: Tüm ürünleri getir
export async function getProducts() {
	const supabase = await createClient();
	const { data, error } = await supabase
		.from("products")
		.select(`
      *,
      categories (id, name),
      product_images (id, image_path, is_main)
    `)
		.order("name");

	if (error) throw new Error(error.message);
	return data;
}

// SELECT: Kategori bazında ürünleri getir
export async function getProductsByCategory(categorySlug: string) {
	const supabase = await createClient();
	const { data, error } = await supabase
		.from("products")
		.select(`
      *,
      categories!inner (id, name, slug),
      product_images (id, image_path, is_main)
    `)
		.eq("categories.slug", categorySlug)
		.order("name");

	if (error) throw new Error(error.message);
	return data;
}

// SELECT: Tek bir ürün getir
export async function getProductBySlug(slug: string) {
	const supabase = await createClient();
	const { data, error } = await supabase
		.from("products")
		.select(`
      *,
      categories (id, name, slug),
      product_images (id, image_path, is_main)
    `)
		.eq("slug", slug)
		.single();

	if (error) throw new Error(error.message);
	return data;
}

// INSERT: Yeni ürün ekle
export async function createProduct(
	productData: z.infer<typeof productSchema>,
) {
	const supabase = await createClient();
	const { data, error } = await supabase
		.from("products")
		.insert([productData])
		.select()
		.single();

	if (error) throw new Error(error.message);
	return data as Product;
}

// UPDATE: Ürün güncelle
export async function updateProduct(
	id: number,
	productData: Partial<z.infer<typeof productSchema>>,
) {
	const supabase = await createClient();
	const { data, error } = await supabase
		.from("products")
		.update(productData)
		.eq("id", id)
		.select()
		.single();

	if (error) throw new Error(error.message);
	return data as Product;
}

// DELETE: Ürün sil
export async function deleteProduct(id: number) {
	const supabase = await createClient();
	const { error } = await supabase.from("products").delete().eq("id", id);

	if (error) throw new Error(error.message);
	return true;
}
