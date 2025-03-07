import { ProductForm } from "@/components/dashboard/product-form";
import { getCategories } from "@/supabase/queries/category";

export default async function NewProductPage() {
	const categories = await getCategories();

	return (
		<div className="container mx-auto py-8">
			<h1 className="text-2xl font-bold mb-6">Yeni Ürün Ekle</h1>
			<ProductForm categories={categories} />
		</div>
	);
}
