import { CategoryForm } from "@/components/dashboard/category-form";

export default function NewCategoryPage() {
	return (
		<div className="container mx-auto py-8">
			<h1 className="text-2xl font-bold mb-6">Yeni Kategori Ekle</h1>
			<CategoryForm />
		</div>
	);
}
