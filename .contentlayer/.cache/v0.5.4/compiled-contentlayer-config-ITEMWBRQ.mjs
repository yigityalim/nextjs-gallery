// contentlayer.config.ts
import {
  defineDocumentType,
  defineNestedType,
  makeSource
} from "contentlayer2/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeUnwrapImages from "rehype-unwrap-images";
import remarkGfm from "remark-gfm";

// src/lib/toc.ts
import { toc } from "mdast-util-toc";
import { remark } from "remark";
import sluggify from "slugify";
import { visit } from "unist-util-visit";
var textTypes = ["text", "emphasis", "strong", "inlineCode"];
function flattenNode(node) {
  const p = [];
  visit(node, (node2) => {
    if (!textTypes.includes(node2.type)) return;
    p.push(node2.value);
  });
  return p.join("");
}
function getItems(node, current) {
  if (!node) {
    return {};
  }
  if (node.type === "paragraph") {
    visit(node, (item) => {
      if (item.type === "link") {
        current.url = `#${sluggify(item.url)}`;
        current.title = flattenNode(node);
      }
      if (item.type === "text") {
        current.title = flattenNode(node);
      }
    });
    return current;
  }
  if (node.type === "list") {
    current.items = node.children.map((i) => getItems(i, {}));
    return current;
  }
  if (node.type === "listItem") {
    const heading = getItems(node.children[0], {});
    if (node.children.length > 1) {
      getItems(node.children[1], heading);
    }
    return heading;
  }
  return {};
}
var getToc = () => (node, file) => {
  const table = toc(node);
  file.data = getItems(table.map, {});
};
async function getTableOfContents(content) {
  const result = await remark().use(getToc).process(content);
  return result.data;
}

// contentlayer.config.ts
var computedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`.replace(/\/\d{2}-/g, "/")
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => `${doc._raw.flattenedPath.split("/").slice(1).join("/")}`.replace(
      /\/\d{2}-/g,
      "/"
    )
  },
  tableOfContents: {
    type: "json",
    resolve: async (post) => {
      return await getTableOfContents(post.body.raw);
    }
  }
};
var AuthorsProperties = defineNestedType(() => ({
  name: "AuthorsProperties",
  fields: {
    name: { type: "string" },
    role: { type: "string" },
    avatar: { type: "string" }
  }
}));
var defaultFields = {
  title: {
    type: "string",
    required: true
  },
  description: {
    type: "string"
  },
  date: { type: "date", required: true },
  authors: { type: "list", of: AuthorsProperties, required: true },
  categories: { type: "list", of: { type: "string" } },
  published: {
    type: "boolean",
    default: true
  },
  toc: {
    type: "boolean",
    default: true,
    required: false
  }
};
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: "posts/**/*.mdx",
  contentType: "mdx",
  fields: defaultFields,
  computedFields
}));
var contentlayer_config_default = makeSource({
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
            ariaLabel: "Link to section"
          }
        }
      ]
    ]
  }
});
export {
  Post,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-ITEMWBRQ.mjs.map
