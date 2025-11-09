// bootstrap-assistant.ts
import OpenAI from "openai";
import fs from "fs";
import path from "path";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

async function main() {
  console.log("🚀 Bootstrapping Ellis Assistant with File Search...");

  // 读取系统提示词
  const promptPath = path.join(process.cwd(), "seed-config", "prompt.mdx");
  const instructions = fs.readFileSync(promptPath, "utf8");

  // 1) 创建向量库
  const vectorStore = await client.vectorStores.create({
    name: "ellis-demo-store",
  });
  console.log("📦 VectorStore:", vectorStore.id);

  // 2) 上传 seed-files 下的所有文件到向量库
  const filesDir = path.join(process.cwd(), "seed-files");
  const fileNames = fs.readdirSync(filesDir);
  if (fileNames.length === 0) {
    throw new Error("seed-files/ 里没有文件，请至少放入一个 .md/.txt/.pdf");
  }
  const streams = fileNames.map((n) =>
    fs.createReadStream(path.join(filesDir, n))
  );

  // 批量上传并等待向量化完成
  await client.vectorStores.fileBatches.uploadAndPoll(vectorStore.id, {
    files: streams,
  });
  console.log("✅ Files uploaded & indexed:", fileNames);

  // 3) 创建 Assistant，启用 file_search 并绑定向量库
  const assistant = await client.beta.assistants.create({
    name: "Ellis – Classroom Reflection Assistant",
    model: "gpt-4o",
    instructions,
    tools: [{ type: "file_search" }],
    tool_resources: {
      file_search: { vector_store_ids: [vectorStore.id] },
    },
  });

  console.log("✅ Assistant created!");
  console.log("🆔 ASSISTANT_ID=", assistant.id);
  console.log("🗃️ VECTOR_STORE_ID=", vectorStore.id);
  console.log("✨ 把 ASSISTANT_ID 加到你的 .env.local 里即可继续下一步。");
}

main().catch((e) => {
  console.error("❌ Bootstrap failed:", e);
  process.exit(1);
});

