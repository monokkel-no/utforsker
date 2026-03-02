import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** Absolute path to the courses/ directory. Server-side only. */
export const coursesDir = resolve(__dirname, "../courses");
