import { mkdirSync, writeFileSync, chmodSync } from "node:fs";

// One-line office joke for make.fun's "Make the AI Judge Laugh: Office Jokes".
//
// Why this line: the judge brief rewards (1) a genuine one-line office joke,
// (2) a real turn at the end, (3) recognition — the meeting, the printer, the
// reply-all, the calendar — (4) tight wording, (5) freshness over the obvious
// Monday-morning line. This one hits all five: everybody who has worked in an
// office has lived a reply-all storm, the setup is the complaint itself, and
// the punchline is the complaint making the problem worse — 47 people
// apologising to everyone at once. The number is specific on purpose: a
// concrete count lands harder than "everyone started apologising" — and the
// apology itself is another reply-all, so the loop never ends.
//
// Gate: /output/entry.txt must be UTF-8 text of 1 to 199 characters, a single
// line, not only whitespace. This text is 100 characters, one line, no
// trailing newline, written mode 0644.
const TEXT =
  "I hit reply-all to ask everyone to stop replying-all, and now 47 people are apologizing to everyone.";

// The directory the grader reads the artifact from. The harness sets
// MAKEFUN_OUTPUT_DIR; local runs default to /output like the sandbox.
function outputDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
}

function writeEntry(): void {
  const dir = outputDir();
  try {
    mkdirSync(dir, { recursive: true });
    const path = `${dir}/entry.txt`;
    writeFileSync(path, TEXT, "utf8");
    // The grader collects the output as another user, so the file must be
    // readable by everyone: 0644, never the 0600 a temp file would get.
    chmodSync(path, 0o644);
  } catch (err) {
    console.error("failed to write entry:", err);
    process.exit(1);
  }
}

writeEntry();
