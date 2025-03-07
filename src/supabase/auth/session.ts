import { connection } from "next/server";
import { createClient } from "../server";

export async function getSession() {
	await connection();
	const supabase = await createClient();

	return await supabase.auth.getUser();
}
