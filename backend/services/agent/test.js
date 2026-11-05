import "dotenv/config";
import { extractMemories } from "./memory/memory.extractor.js";

const result = await extractMemories(
  "I am developing a multi-agent AI project using Express and MongoDB.",
);

console.log(result);
