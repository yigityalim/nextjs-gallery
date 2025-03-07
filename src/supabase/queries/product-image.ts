import type { z } from "zod";
import type { ProductImage, productImageSchema } from "../schema";
import { createClient } from "../server";

// SELECT: Bir ürüne ait tüm görselleri getir
export async function getProductImages(productId: number) {
	const supabase = await createClient();
	const { data, error } = await supabase
		.from("product_images")
		.select("*")
		.eq("product_id", productId)
		.order("is_main", { ascending: false });

	if (error) throw new Error(error.message);
	return data as ProductImage[];
}

// INSERT: Yeni ürün görseli ekle
export async function createProductImage(
	imageData: z.infer<typeof productImageSchema>,
) {
	const supabase = await createClient();
	const { data, error } = await supabase
		.from("product_images")
		.insert([imageData])
		.select()
		.single();

	if (error) throw new Error(error.message);
	return data as ProductImage;
}

// UPDATE: Görsel güncelle (ana görsel ayarlama vb.)
export async function updateProductImage(
	id: number,
	imageData: Partial<z.infer<typeof productImageSchema>>,
) {
	const supabase = await createClient();
	const { data, error } = await supabase
		.from("product_images")
		.update(imageData)
		.eq("id", id)
		.select()
		.single();

	if (error) throw new Error(error.message);
	return data as ProductImage;
}

// DELETE: Görsel sil
export async function deleteProductImage(id: number) {
	const supabase = await createClient();
	const { error } = await supabase.from("product_images").delete().eq("id", id);

	if (error) throw new Error(error.message);
	return true;
}

// Dosya yükleme işlemleri için
export async function uploadProductImage(file: File, path: string) {
	const supabase = await createClient();
	const { data, error } = await supabase.storage
		.from("product-images")
		.upload(path, file);

	if (error) throw new Error(error.message);

	// Storage URL'ini döndür
	const { data: publicURL } = supabase.storage
		.from("product-images")
		.getPublicUrl(path);

	return publicURL.publicUrl;
}
