import { Cookies } from "@/lib/cookies";
import { type CookieOptions, createServerClient } from "@supabase/ssr";
import type { Database } from "database/types";
import type { NextRequest, NextResponse } from "next/server";
import { setSkipSessionRefreshCookie } from "./utils";

export async function updateSession(
	request: NextRequest,
	response: NextResponse,
) {
	const supabase = createServerClient<Database>(
		process.env.NEXT_PUBLIC_SUPABASE_URL as string,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
		{
			global: {
				headers: {
					// https://supabase.com/docs/guides/platform/read-replicas#experimental-routing
					"sb-lb-routing-mode": "alpha-all-services",
				},
			},
			cookies: {
				get(name: string) {
					return request.cookies.get(name)?.value;
				},
				set(name: string, value: string, options: CookieOptions) {
					request.cookies.set({ name, value, ...options });
					response.cookies.set({ name, value, ...options });
					setSkipSessionRefreshCookie(response, true);
				},
				remove(name: string, options: CookieOptions) {
					request.cookies.set({ name, value: "", ...options });
					response.cookies.set({ name, value: "", ...options });
					setSkipSessionRefreshCookie(response, false);
				},
			},
		},
	);

	// Eğer çerez ayarlanmamışsa, uzak oturumu kontrol et
	if (!request.cookies.get(Cookies.SkipSessionRefresh)) {
		await supabase.auth.getUser();
	}

	return response;
}
