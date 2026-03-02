import { createServerFn } from "@tanstack/react-start";
import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative, resolve } from "node:path";
import { coursesDir } from "@repo/course-browser/coursesPath.js";

async function collectFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(full)));
    } else if (extname(entry.name) === ".md") {
      files.push(relative(coursesDir, full));
    }
  }

  return files.sort();
}

export const getCourseTree = createServerFn({
  method: "GET",
}).handler(async () => {
  return collectFiles(coursesDir);
});

export interface GetCourseFileOptions {
  path: string;
}

export const getCourseFile = createServerFn({
  method: "POST",
})
  .inputValidator((data: GetCourseFileOptions) => data)
  .handler(async ({ data }) => {
    const resolved = resolve(coursesDir, data.path);
    if (!resolved.startsWith(`${coursesDir}/`)) {
      throw new Error("Invalid path");
    }

    return readFile(resolved, "utf-8");
  });
