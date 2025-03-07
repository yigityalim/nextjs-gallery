"use server";

import {
	createCategory,
	deleteCategory,
	updateCategory,
} from "@/supabase/queries/category";
import { categorySchema } from "@/supabase/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function createCategoryAction(
	prevState: unknown,
	formData: FormData,
) {
	try {
		// Form verilerini al ve doğrula
		const rawData = {
			name: formData.get("name"),
			slug: formData.get("slug"),
			description: formData.get("description") || "",
		};

		// Zod ile doğrulama
		const validatedFields = categorySchema.safeParse(rawData);

		// Doğrulama hataları varsa geri dön
		if (!validatedFields.success) {
			return {
				error: "Doğrulama hatası",
				errors: validatedFields.error.flatten().fieldErrors,
			};
		}

		// Kategori oluştur
		await createCategory(validatedFields.data);

		// Veriyi güncelle ve yönlendir
		revalidatePath("/admin/categories");
		redirect("/admin/categories");
	} catch (error) {
		return {
			error: "Kategori oluşturulurken bir hata oluştu",
			message: error instanceof Error ? error.message : "Bilinmeyen hata",
		};
	}
}

export async function updateCategoryAction(
	id: number,
	prevState: unknown,
	formData: FormData,
) {
	try {
		// Form verilerini al ve doğrula
		const rawData = {
			name: formData.get("name"),
			slug: formData.get("slug"),
			description: formData.get("description") || "",
		};

		// Zod ile doğrulama
		const validatedFields = categorySchema.safeParse(rawData);

		// Doğrulama hataları varsa geri dön
		if (!validatedFields.success) {
			return {
				error: "Doğrulama hatası",
				errors: validatedFields.error.flatten().fieldErrors,
			};
		}

		// Kategori güncelle
		await updateCategory(id, validatedFields.data);

		// Veriyi güncelle ve yönlendir
		revalidatePath("/admin/categories");
		redirect("/admin/categories");
	} catch (error) {
		return {
			error: "Kategori güncellenirken bir hata oluştu",
			message: error instanceof Error ? error.message : "Bilinmeyen hata",
		};
	}
}

export async function deleteCategoryAction(id: number) {
	try {
		await deleteCategory(id);
		revalidatePath("/admin/categories");
		return { success: true };
	} catch (error) {
		return {
			error: "Kategori silinirken bir hata oluştu",
			message: error instanceof Error ? error.message : "Bilinmeyen hata",
		};
	}
}
