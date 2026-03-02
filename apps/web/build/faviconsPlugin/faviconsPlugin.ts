import { logoSvg } from "@repo/core/logoSvg.js";
import { favicons } from "favicons";
import { promises as fs } from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

const source = Buffer.from(logoSvg, "utf8");

const outDir = path.resolve(__dirname, "../../public/favicons");

const virtualId = "virtual:favicons";
const resolvedId = "\0virtual:favicons";

interface ParsedHtmlTags {
  links: Record<string, string>[];
  meta: Record<string, string>[];
}

const parseHtmlTags = (htmlTags: string[]): ParsedHtmlTags => {
  const links: Record<string, string>[] = [];
  const meta: Record<string, string>[] = [];

  for (const html of htmlTags) {
    const tagMatch = html.match(/^<(\w+)/);
    if (!tagMatch) continue;
    const tag = tagMatch[1].toLowerCase();

    const attrs: Record<string, string> = {};
    const attributeRegex = /([\w-]+)="([^"]*)"/g;
    let match = attributeRegex.exec(html);
    while (match !== null) {
      attrs[match[1]] = match[2];
      match = attributeRegex.exec(html);
    }

    if (tag === "link") links.push(attrs);
    else if (tag === "meta") meta.push(attrs);
  }

  return { links, meta };
};

export const faviconsPlugin = (): Plugin => {
  let faviconLinks: Record<string, string>[] = [];
  let faviconMeta: Record<string, string>[] = [];

  return {
    name: "generate-favicons",
    async buildStart() {
      const result = await favicons(source, {
        path: "/favicons",
        appName: "Utforsker",
        appShortName: "Utforsker",
      });

      await fs.mkdir(outDir, { recursive: true });

      await Promise.all(result.images.map((image) => fs.writeFile(path.join(outDir, image.name), image.contents)));

      await Promise.all(result.files.map((file) => fs.writeFile(path.join(outDir, file.name), file.contents)));

      const parsed = parseHtmlTags(result.html);
      faviconLinks = parsed.links;
      faviconMeta = parsed.meta;
    },

    resolveId(id) {
      if (id !== virtualId) return;
      return resolvedId;
    },

    load(id) {
      if (id !== resolvedId) return;
      return `export const faviconLinks = ${JSON.stringify(faviconLinks)};
export const faviconMeta = ${JSON.stringify(faviconMeta)};`;
    },
  };
};
