export function isExplicitMemoryRequest(message) {
  return /^(please\s+)?(remember(?:\s+that)?|save (?:this|that|the following) (?:to|in) memory|keep in mind)\b/i.test(
    message.trim(),
  );
}
