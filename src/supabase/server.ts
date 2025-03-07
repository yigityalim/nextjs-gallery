import { createServerClient } from "@supabase/ssr";
import type { Database } from "database/types";
import { cookies } from "next/headers";

export async function createClient() {
	const cookieStore = await cookies();

	return createServerClient<Database>(
		process.env.NEXT_PUBLIC_SUPABASE_URL as string,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
		{
			cookies: {
				getAll() {
					return cookieStore.getAll();
				},
				setAll(cookiesToSet) {
					try {
						for (const cookie of cookiesToSet) {
							cookieStore.set(cookie.name, cookie.value, cookie.options);
						}
					} catch {
						// The `setAll` method was called from a Server Component.
						// This can be ignored if you have middleware refreshing
						// user sessions.
						console.warn(
							"Attempted to set cookies in a Server Component without a `cookies` header.",
						);
					}
				},
			},
		},
	);
}
