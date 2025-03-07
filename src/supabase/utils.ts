import { Cookies } from "@/lib/cookies";
import type { NextResponse } from "next/server";

export function setSkipSessionRefreshCookie(
	response: NextResponse,
	value: boolean,
) {
	response.cookies.set({
		name: Cookies.SkipSessionRefresh,
		value: value ? "true" : "",
		path: "/",
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		maxAge: value ? 30 * 60 : 0,
	});
}
