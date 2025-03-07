import { getCategories } from "@/supabase/queries";

export default async function Page() {
	const allCategories = await getCategories();

	return (
		<div>
			{allCategories.map((category) => (
				<div key={category.id}>{category.name}</div>
			))}
		</div>
	);
}
