import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

import {
  HumanMessage,
  SystemMessage,
  AIMessage,
  tool,
  createAgent,
} from "langchain";

import * as z from "zod";

import { searchInternet } from "./internet.service.js";

const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-flash-latest",
  apiKey: process.env.GEMINI_API_KEY,
});

const searchInternetTool = tool(searchInternet, {
  name: "searchInternet",

  description: "Use this tool to get the latest information from the internet.",

  schema: z.object({
    query: z.string().describe("The search query to look up on the internet."),
  }),
});

const agent = createAgent({
  model: geminiModel,
  tools: [searchInternetTool],
});

export async function generateResponse(messages) {
  console.log("Messages:", messages);

  const response = await agent.invoke({
    messages: [
      new SystemMessage(`
        You are a helpful and precise AI assistant.

        Rules:
        - Answer the user's question clearly and accurately.
        - If you don't know something, say you don't know.
        - If the question requires current or up-to-date information,
          use the searchInternet tool.
        - Use the search results to provide the final answer.
        - Keep answers easy to understand.
      `),

      ...messages
        .map((msg) => {
          if (msg.role === "user") {
            return new HumanMessage(msg.content);
          }

          if (msg.role === "ai") {
            return new AIMessage(msg.content);
          }

          return null;
        })
        .filter(Boolean),
    ],
  });

  const lastMessage = response.messages[response.messages.length - 1];

  return lastMessage.text;
}

export async function generateChatTitle(message) {
  const response = await geminiModel.invoke([
    new SystemMessage(`
      You generate short titles for chat conversations.

      Rules:
      - Generate a clear and descriptive title.
      - Use only 2-4 words.
      - Do not use quotation marks.
      - Do not add explanations.
      - Return only the title.
    `),

    new HumanMessage(`
      Generate a title for this user's first message:

      "${message}"
    `),
  ]);

  return response.text.trim();
}
