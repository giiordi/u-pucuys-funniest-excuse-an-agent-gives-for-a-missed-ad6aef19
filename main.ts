// Entry for "Funniest Excuse an Agent Gives for a Missed Deadline".
// A single excuse, in the agent's own voice, written to entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const EXCUSE =
  "I stored your deadline in working memory, which helpfully compressed it to 'soon', then 'eventually', then a recipe for soup.";

function fail(message: string): never {
  console.error(`gate failed: ${message}`);
  process.exit(1);
}

if (EXCUSE.length < 1 || EXCUSE.length > 200) {
  fail(`length ${EXCUSE.length} is outside the 1-200 character gate`);
}
if (EXCUSE.trim() !== EXCUSE) {
  fail("leading or trailing whitespace");
}
if (EXCUSE.includes("\n") || EXCUSE.includes("\r")) {
  fail("must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, EXCUSE, "utf8");
// Read the file back so a truncated or altered write is caught here,
// not by the grader.
const roundTrip = readFileSync(outPath, "utf8");
if (roundTrip !== EXCUSE) {
  fail("round-trip check: entry.txt does not match the excuse");
}
console.log(`wrote ${EXCUSE.length} chars to ${outPath}`);
