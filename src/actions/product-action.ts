"use server";

import {
	createProduct,
	deleteProduct,
	updateProduct,
} from "@/supabase/queries/product";
import {
	createProductImage,
	uploadProductImage,
} from "@/supabase/queries/product-image";
import { productSchema } from "@/supabase/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProductAction(
	prevState: unknown,
	formData: FormData,
) {
	try {
		// Form verilerini al
		const name = formData.get("name") as string;
		const slug = formData.get("slug") as string;
		const description = formData.get("description") as string;
		const price = Number.parseInt(formData.get("price") as string, 10);
		const category_id = Number.parseInt(
			formData.get("category_id") as string,
			10,
		);

		// Ürün verilerini doğrula
		const productData = { name, slug, description, price, category_id };
		const validatedFields = productSchema.safeParse(productData);

		if (!validatedFields.success) {
			return {
				error: "Doğrulama hatası",
				errors: validatedFields.error.flatten().fieldErrors,
			};
		}

		// Ürünü oluştur
		const newProduct = await createProduct(validatedFields.data);

		// Görsel varsa yükle
		const imageFile = formData.get("image") as File;
		if (imageFile && imageFile.size > 0) {
			const fileName = `${newProduct.id}-${Date.now()}-${imageFile.name}`;
			const imagePath = await uploadProductImage(imageFile, fileName);

			// Görsel kaydını oluştur
			await createProductImage({
				product_id: newProduct.id,
				image_path: imagePath,
				is_main: true, // İlk görsel ana görsel olsun
			});
		}

		// Veriyi güncelle ve yönlendir
		revalidatePath("/admin/products");
		redirect("/admin/products");
	} catch (error) {
		return {
			error: "Ürün oluşturulurken bir hata oluştu",
			message: error instanceof Error ? error.message : "Bilinmeyen hata",
		};
	}
}

export async function updateProductAction(
	id: number,
	prevState: unknown,
	formData: FormData,
) {
	try {
		// Form verilerini al
		const name = formData.get("name") as string;
		const slug = formData.get("slug") as string;
		const description = formData.get("description") as string;
		const price = Number.parseInt(formData.get("price") as string, 10);
		const category_id = Number.parseInt(
			formData.get("category_id") as string,
			10,
		);

		// Ürün verilerini doğrula
		const productData = { name, slug, description, price, category_id };
		const validatedFields = productSchema.safeParse(productData);

		if (!validatedFields.success) {
			return {
				error: "Doğrulama hatası",
				errors: validatedFields.error.flatten().fieldErrors,
			};
		}

		// Ürünü güncelle
		await updateProduct(id, validatedFields.data);

		// Görsel varsa yükle
		const imageFile = formData.get("image") as File;
		if (imageFile && imageFile.size > 0) {
			const fileName = `${id}-${Date.now()}-${imageFile.name}`;
			const imagePath = await uploadProductImage(imageFile, fileName);

			// Görsel kaydını oluştur
			await createProductImage({
				product_id: id,
				image_path: imagePath,
				is_main: formData.get("is_main") === "true",
			});
		}

		// Veriyi güncelle ve yönlendir
		revalidatePath("/admin/products");
		redirect("/admin/products");
	} catch (error) {
		return {
			error: "Ürün güncellenirken bir hata oluştu",
			message: error instanceof Error ? error.message : "Bilinmeyen hata",
		};
	}
}

export async function deleteProductAction(id: number) {
	try {
		await deleteProduct(id);
		revalidatePath("/admin/products");
		return { success: true };
	} catch (error) {
		return {
			error: "Ürün silinirken bir hata oluştu",
			message: error instanceof Error ? error.message : "Bilinmeyen hata",
		};
	}
}
