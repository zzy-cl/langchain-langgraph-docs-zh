# 基础使用方法

## 聊天模型基础使用
聊天模型是LangChain最常用的组件之一，下面我们介绍一些常见的使用场景。

### 基础对话
```typescript
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

const chat = new ChatOpenAI({ temperature: 0 });

const response = await chat.invoke([
  new SystemMessage("你是一个专业的JavaScript开发专家，回答问题要简洁准确。"),
  new HumanMessage("解释一下JavaScript中的闭包是什么？")
]);

console.log(response.content);
```

### 流式输出
如果你需要实时获取模型的输出，可以使用流式调用：
```typescript
const stream = await chat.stream([
  new HumanMessage("写一个快速排序的JavaScript实现")
]);

for await (const chunk of stream) {
  process.stdout.write(chunk.content);
}
```

## 提示词模板进阶
### 多变量模板
```typescript
import { ChatPromptTemplate } from "@langchain/core/prompts";

const prompt = ChatPromptTemplate.fromTemplate(`
你是一个经验丰富的技术面试官，正在面试{position}岗位的候选人。
请根据候选人的{experience}年工作经验，提出一个合适的技术问题。
`);

const formattedPrompt = await prompt.format({
  position: "前端开发工程师",
  experience: 3
});
```

## 输出解析器
输出解析器可以帮你将模型返回的文本转换成结构化的数据，比如JSON、数组等：
```typescript
import { z } from "zod";
import { StructuredOutputParser } from "langchain/output_parsers";

// 定义输出结构
const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    name: z.string().describe("用户的姓名"),
    age: z.number().describe("用户的年龄"),
    hobbies: z.array(z.string()).describe("用户的爱好列表")
  })
);

// 获取格式说明
const formatInstructions = parser.getFormatInstructions();

// 构建提示词
const prompt = ChatPromptTemplate.fromTemplate(`
提取下面文本中的用户信息：
{input}
{format_instructions}
`);

// 构建链
const chain = prompt.pipe(chat).pipe(parser);

// 调用
const result = await chain.invoke({
  input: "我叫张三，今年28岁，喜欢打篮球、看电影和编程。",
  format_instructions: formatInstructions
});

console.log(result);
// 输出: { name: "张三", age: 28, hobbies: ["打篮球", "看电影", "编程"] }
```

## 常见使用技巧
1. **设置temperature参数**：值越低（0-1），输出越稳定、越确定；值越高，输出越有创意、越随机。
2. **使用SystemMessage设定角色**：在对话开始时使用系统消息设定模型的角色和行为准则，可以得到更符合预期的输出。
3. **拆分复杂任务**：对于复杂的任务，拆分成多个小步骤，用链或者LangGraph来处理，比一次性让模型完成效果更好。
