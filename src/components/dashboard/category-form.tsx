//@ts-nocheck

"use client";

import {
	createCategoryAction,
	updateCategoryAction,
} from "@/actions/category-actions";
import type { Category } from "@/supabase/schema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useActionState } from "react";

interface CategoryFormProps {
	category?: Category;
}

export function CategoryForm({ category }: CategoryFormProps) {
	const router = useRouter();
	const isEditing = !!category;

	// Form state yönetimi
	const initialState = { errors: {} };
	const [state, formAction] = useActionState(
		isEditing
			? updateCategoryAction.bind(null, category.id)
			: createCategoryAction,
		initialState,
	);

	const [slug, setSlug] = useState(category?.slug || "");
	const [name, setName] = useState(category?.name || "");

	// İsimden otomatik slug oluşturma
	const generateSlug = (value: string) => {
		return value
			.toLowerCase()
			.replace(/[^a-z0-9\s-]/g, "")
			.replace(/\s+/g, "-");
	};

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newName = e.target.value;
		setName(newName);

		// İsim değişirse ve slug manuel değiştirilmemişse, otomatik slug oluştur
		if (!isEditing && (slug === "" || slug === generateSlug(name))) {
			setSlug(generateSlug(newName));
		}
	};

	return (
		<form action={formAction} className="max-w-2xl p-2">
			{state.error && (
				<div className="mb-4 p-4 bg-red-50 text-red-600 rounded-md border border-red-200">
					{state.error}: {state.message}
				</div>
			)}

			<div className="mb-4">
				<label
					htmlFor="name"
					className="block text-sm font-medium text-gray-700 mb-1"
				>
					Kategori Adı
				</label>
				<input
					type="text"
					id="name"
					name="name"
					value={name}
					onChange={handleNameChange}
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					required
				/>
				{state.errors?.name && (
					<p className="mt-1 text-sm text-red-600">{state.errors.name}</p>
				)}
			</div>

			<div className="mb-4">
				<label
					htmlFor="slug"
					className="block text-sm font-medium text-gray-700 mb-1"
				>
					Slug
				</label>
				<input
					type="text"
					id="slug"
					name="slug"
					value={slug}
					onChange={(e) => setSlug(e.target.value)}
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					readOnly
				/>
				{state.errors?.slug && (
					<p className="mt-1 text-sm text-red-600">{state.errors.slug}</p>
				)}
			</div>

			<div className="mb-6">
				<label
					htmlFor="description"
					className="block text-sm font-medium text-gray-700 mb-1"
				>
					Açıklama
				</label>
				<textarea
					id="description"
					name="description"
					defaultValue={category?.description || ""}
					rows={4}
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>

			<div className="flex gap-4">
				<button
					type="submit"
					className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					{isEditing ? "Güncelle" : "Oluştur"}
				</button>

				<button
					type="button"
					onClick={() => router.back()}
					className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
				>
					İptal
				</button>
			</div>
		</form>
	);
}
