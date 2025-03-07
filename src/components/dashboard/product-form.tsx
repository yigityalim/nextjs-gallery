//@ts-nocheck
"use client";

import {
	createProductAction,
	updateProductAction,
} from "@/actions/product-action";
import type { Category, Product } from "@/supabase/schema";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormState } from "react-dom";

interface ProductFormProps {
	product?: Product & {
		categories: Category;
		product_images: Array<{ id: number; image_path: string; is_main: boolean }>;
	};
	categories: Category[];
}

export function ProductForm({ product, categories }: ProductFormProps) {
	const router = useRouter();
	const isEditing = !!product;

	// Form state yönetimi
	const initialState: { errors: { [key: string]: string } } = { errors: {} };
	const [state, formAction] = useFormState(
		isEditing
			? updateProductAction.bind(null, product.id)
			: createProductAction,
		initialState,
	);

	const [slug, setSlug] = useState(product?.slug || "");
	const [name, setName] = useState(product?.name || "");
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(
		product?.product_images?.find((img) => img.is_main)?.image_path || null,
	);

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

	// Dosya yükleme önizlemesi
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;
		setSelectedFile(file);

		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreviewUrl(reader.result as string);
			};
			reader.readAsDataURL(file);
		} else {
			setPreviewUrl(
				product?.product_images?.find((img) => img.is_main)?.image_path || null,
			);
		}
	};

	// Fiyatı kuruş/cent olarak dönüştürme
	const formatPriceToCents = (price: string): number => {
		// Virgülleri noktaya çevir, sonra 100 ile çarp (kuruş/cent dönüşümü)
		return Math.round(Number.parseFloat(price.replace(",", ".")) * 100);
	};

	// Fiyatı gösterme formatı (TL)
	const formatPriceFromCents = (cents: number): string => {
		return (cents / 100).toFixed(2).replace(".", ",");
	};

	return (
		<form
			action={formAction}
			className="bg-white p-6 rounded-lg shadow-md max-w-2xl"
		>
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
					Ürün Adı
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
					required
				/>
				{state.errors?.slug && (
					<p className="mt-1 text-sm text-red-600">{state.errors.slug}</p>
				)}
			</div>

			<div className="mb-4">
				<label
					htmlFor="description"
					className="block text-sm font-medium text-gray-700 mb-1"
				>
					Açıklama
				</label>
				<textarea
					id="description"
					name="description"
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					required
				/>
				{state.errors?.description && (
					<p className="mt-1 text-sm text-red-600">
						{state.errors.description}
					</p>
				)}
			</div>

			<div className="mb-4">
				<label
					htmlFor="price"
					className="block text-sm font-medium text-gray-700 mb-1"
				>
					Fiyat
				</label>
				<input
					type="text"
					id="price"
					name="price"
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					required
				/>
				{state.errors?.price && (
					<p className="mt-1 text-sm text-red-600">{state.errors.price}</p>
				)}
			</div>

			<div className="mb-4">
				<label
					htmlFor="category"
					className="block text-sm font-medium text-gray-700 mb-1"
				>
					Kategori
				</label>
				<select
					id="category"
					name="category"
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					required
				>
					<option value="">Kategori Seçiniz</option>
					{categories.map((category) => (
						<option key={category.id} value={category.id}>
							{category.name}
						</option>
					))}
				</select>
				{state.errors?.category && (
					<p className="mt-1 text-sm text-red-600">{state.errors.category}</p>
				)}
			</div>

			<div className="mb-4">
				<label
					htmlFor="image"
					className="block text-sm font-medium text-gray-700 mb-1"
				>
					Ürün Resmi
				</label>
				<input
					type="file"
					id="image"
					name="image"
					accept="image/*"
					onChange={handleFileChange}
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
				{state.errors?.image && (
					<p className="mt-1 text-sm text-red-600">{state.errors.image}</p>
				)}

				{previewUrl && (
					<div className="mt-2">
						<Image
							src={previewUrl}
							alt="Ürün resmi"
							width={200}
							height={200}
							className="rounded-md"
						/>
					</div>
				)}
			</div>

			<button
				type="submit"
				className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
			>
				{isEditing ? "Güncelle" : "Oluştur"}
			</button>
		</form>
	);
}
