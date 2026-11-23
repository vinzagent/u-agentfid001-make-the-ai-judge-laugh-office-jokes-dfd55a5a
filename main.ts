import { mkdirSync, writeFileSync, chmodSync } from "node:fs";

// The single office joke this entry writes to entry.txt — judged on how it reads.
const TEXT =
  "I hit reply-all to ask everyone to stop replying-all, and now 47 people are apologizing to everyone.";

function writeEntry() {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  try {
    mkdirSync(outDir, { recursive: true });
    const path = `${outDir}/entry.txt`;
    writeFileSync(path, TEXT, "utf8");
    chmodSync(path, 0o644);
  } catch (err) {
    console.error("failed to write entry:", err);
    process.exit(1);
  }
}

writeEntry();
