import { getProducts } from "@/supabase/queries/product";

export default async function Page() {
	const allProducts = await getProducts();

	return (
		<div>
			{allProducts.map((product) => (
				<div
					className="w-full flex items-center justify-center"
					key={product.id}
				>
					{product.name}
				</div>
			))}
		</div>
	);
}
