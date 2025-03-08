import {
	type ComputedFields,
	type FieldDefs,
	defineDocumentType,
	defineNestedType,
	makeSource,
} from "contentlayer2/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeUnwrapImages from "rehype-unwrap-images";
import remarkGfm from "remark-gfm";

import { getTableOfContents } from "@/lib/toc";

const computedFields = {
	slug: {
		type: "string",
		resolve: (doc) => `/${doc._raw.flattenedPath}`.replace(/\/\d{2}-/g, "/"),
	},
	slugAsParams: {
		type: "string",
		resolve: (doc) =>
			`${doc._raw.flattenedPath.split("/").slice(1).join("/")}`.replace(
				/\/\d{2}-/g,
				"/",
			),
	},
	tableOfContents: {
		type: "json",
		resolve: async (post) => {
			return await getTableOfContents(post.body.raw);
		},
	},
} satisfies ComputedFields;

const AuthorsProperties = defineNestedType(() => ({
	name: "AuthorsProperties",
	fields: {
		name: { type: "string" },
		role: { type: "string" },
		avatar: { type: "string" },
	},
}));

const defaultFields = {
	title: {
		type: "string",
		required: true,
	},
	description: {
		type: "string",
	},
	date: { type: "date", required: true },
	authors: { type: "list", of: AuthorsProperties, required: true },
	categories: { type: "list", of: { type: "string" } },
	cover: { type: "string" },
	published: {
		type: "boolean",
		default: true,
	},
	toc: {
		type: "boolean",
		default: true,
		required: false,
	},
} satisfies FieldDefs;

export const Post = defineDocumentType(() => ({
	name: "Post",
	filePathPattern: "posts/**/*.mdx",
	contentType: "mdx",
	fields: defaultFields,
	computedFields,
}));

export default makeSource({
	contentDirPath: "./src/content",
	documentTypes: [Post],
	mdx: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [
			rehypeSlug,
			rehypeUnwrapImages,
			[
				rehypeAutolinkHeadings,
				{
					properties: {
						className: ["subheading-anchor"],
						ariaLabel: "Link to section",
					},
				},
			],
		],
	},
});
