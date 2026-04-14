# 快速入门

## 什么是LangChain？
LangChain是一个用于构建语言模型应用的开发框架，它可以帮助开发者轻松地将大型语言模型（LLM）与外部工具、数据源结合起来，构建功能强大的AI应用。

## 环境准备
在开始使用LangChain之前，你需要准备以下环境：
- Node.js 18+ 版本
- 一个可用的LLM API密钥（例如OpenAI API Key）

## 安装LangChain
使用npm安装LangChain的TypeScript版本：
```bash
npm install @langchain/openai langchain
```

## 第一个LangChain应用
下面我们来写一个最简单的LangChain应用，让大语言模型帮我们回答问题：

```typescript
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";

// 初始化OpenAI聊天模型
const chatModel = new ChatOpenAI({
  openAIApiKey: "你的API密钥",
  model: "gpt-3.5-turbo",
});

// 发送消息并获取回复
const response = await chatModel.invoke([
  new HumanMessage("你好，请介绍一下你自己。")
]);

console.log(response.content);
```

## 运行应用
将上面的代码保存为`hello-langchain.ts`，然后运行：
```bash
npx tsx hello-langchain.ts
```

你应该能看到模型返回的回复，恭喜你已经成功运行了第一个LangChain应用！

## 常见问题
### Q: 我没有OpenAI API密钥怎么办？
A: LangChain支持多种大语言模型，包括国内的通义千问、文心一言、Claude等，你可以选择自己使用的模型提供商。

### Q: 运行时提示找不到模块？
A: 确保你已经正确安装了所有依赖，并且Node.js版本符合要求。
