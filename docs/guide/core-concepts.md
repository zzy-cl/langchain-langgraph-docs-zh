# 核心概念

LangChain的核心设计围绕几个关键概念展开，理解这些概念是用好LangChain的基础。

## 1. 模型 (Models)
模型是LangChain的核心，负责和大语言模型进行交互。LangChain支持多种类型的模型：
- **聊天模型 (Chat Models)**：接收聊天消息列表作为输入，返回聊天消息
- **大语言模型 (LLMs)**：接收字符串输入，返回字符串
- **嵌入模型 (Embedding Models)**：将文本转换为数值向量表示，用于检索、相似度计算等场景

## 2. 提示词 (Prompts)
提示词是你发送给大语言模型的输入，LangChain提供了提示词模板功能，可以方便地复用和动态生成提示词：
```typescript
import { ChatPromptTemplate } from "@langchain/core/prompts";

const prompt = ChatPromptTemplate.fromMessages([
  ["system", "你是一个专业的翻译官，将用户输入的{source_lang}翻译成{target_lang}。"],
  ["human", "{input}"]
]);

// 动态填充模板
const formattedPrompt = await prompt.format({
  source_lang: "中文",
  target_lang: "英文",
  input: "你好，世界"
});
```

## 3. 链 (Chains)
链是将多个组件串联起来的工作流，你可以将模型、提示词、输出解析器等组件组合成一个完整的处理流程：
```typescript
import { StringOutputParser } from "@langchain/core/output_parsers";

// 将提示词模板、模型、输出解析器组合成链
const chain = prompt.pipe(chatModel).pipe(new StringOutputParser());

// 运行链
const result = await chain.invoke({
  source_lang: "中文",
  target_lang: "英文",
  input: "你好，世界"
});

console.log(result); // 输出: Hello, world
```

## 4. 检索器 (Retrievers)
检索器用于从外部数据源获取相关信息，然后将这些信息注入到提示词中，让模型可以使用最新的或者私有数据来回答问题。常见的检索场景包括文档问答、知识库问答等。

## 5. 智能体 (Agents)
智能体是LangChain的高级功能，它可以让模型自主决定下一步应该调用什么工具、执行什么操作，适合处理复杂的、需要多步骤完成的任务。

## 6. LangGraph
LangGraph是LangChain团队开发的用于构建状态化、多角色、循环工作流的框架，特别适合构建智能体、工作流自动化等需要持久化状态和多步骤决策的应用。
