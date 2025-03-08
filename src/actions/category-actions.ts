"use server";

import {
	createCategory,
	deleteCategory,
	getCategories,
	updateCategory,
} from "@/supabase/queries/category";
import { categorySchema } from "@/supabase/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createCategoryAction(
	prevState: unknown,
	formData: FormData,
) {
	try {
		// Form verilerini al
		const name = formData.get("name") as string;
		const slug = formData.get("slug") as string;

		// Kategori verilerini doğrula
		const categoryData = { name, slug };
		const validatedFields = categorySchema.safeParse(categoryData);

		if (!validatedFields.success) {
			return {
				error: "Doğrulama hatası",
				errors: validatedFields.error.flatten().fieldErrors,
			};
		}

		// Kategoriyi oluştur
		const newCategory = await createCategory(validatedFields.data);

		// Yönlendir
		redirect(`/dashboard/categories/${newCategory.id}`);
	} catch (error) {
		if (error instanceof Error)
			return {
				error: "Bir hata oluştu",
				message: error.message,
			};

		return {
			error: "Bir hata oluştu",
			message: "Bilinmeyen hata",
		};
	}
}

export async function updateCategoryAction(
	categoryId: number,
	formData: FormData,
) {
	try {
		// Form verilerini al
		const name = formData.get("name") as string;
		const slug = formData.get("slug") as string;

		// Kategori verilerini doğrula
		const categoryData = { name, slug };
		const validatedFields = categorySchema.safeParse(categoryData);

		if (!validatedFields.success) {
			return {
				error: "Doğrulama hatası",
				errors: validatedFields.error.flatten().fieldErrors,
			};
		}

		// Kategoriyi güncelle
		await updateCategory(categoryId, validatedFields.data);

		// Yönlendir
		redirect(`/dashboard/categories/${categoryId}`);
	} catch (error) {
		if (error instanceof Error)
			return {
				error: "Bir hata oluştu",
				message: error.message,
			};

		return {
			error: "Bir hata oluştu",
			message: "Bilinmeyen hata",
		};
	}
}

export async function deleteCategoryAction(categoryId: number) {
	try {
		// Kategoriyi sil
		await deleteCategory(categoryId);

		// Veriyi güncelle ve yönlendir
		revalidatePath("/dashboard/categories");
		redirect("/dashboard/categories");
	} catch (error) {
		return {
			error: "Kategori silinirken bir hata oluştu",
			message: error instanceof Error ? error.message : "Bilinmeyen hata",
		};
	}
}

export async function getCategoriesAction() {
	return await getCategories();
}
