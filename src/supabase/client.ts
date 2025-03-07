import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "database/types";

export type { Database };

export const createClient = () => {
	return createBrowserClient<Database>(
		process.env.NEXT_PUBLIC_SUPABASE_URL as string,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
		{
			global: {
				headers: {
					// https://supabase.com/docs/guides/platform/read-replicas#experimental-routing
					"sb-lb-routing-mode": "alpha-all-services",
				},
			},
		},
	);
};
