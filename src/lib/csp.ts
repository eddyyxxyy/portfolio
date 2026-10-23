import { createHash } from "node:crypto";

interface CspRuntime {
  insertScriptHash: CallableFunction;
}

export const registerInlineScript = (
  csp: CspRuntime | undefined,
  source: string,
) => {
  const digest = createHash("sha256").update(source).digest("base64");
  csp?.insertScriptHash(`sha256-${digest}`);

  return source;
};
