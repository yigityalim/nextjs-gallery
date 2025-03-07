import type { NextConfig } from "next";
import { createContentlayerPlugin } from "next-contentlayer2";

const withContentlayer = createContentlayerPlugin({
	// Additional Contentlayer config options
});

const nextConfig: NextConfig = {
	experimental: {
		useCache: true,
	},
};

export default withContentlayer(nextConfig);
