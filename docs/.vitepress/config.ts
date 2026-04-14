import { defineConfig } from 'vitepress'

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  title: 'LangChain & LangGraph 中文文档',
  description: 'LangChain和LangGraph官方文档中文本地化版本，提供通俗易懂的学习教程和示例',
  base: '/langchain-langgraph-docs-zh/',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '快速入门', link: '/guide/getting-started' },
      { text: '核心概念', link: '/guide/core-concepts' },
      { text: '基础使用', link: '/guide/basic-usage' },
      { text: 'GitHub', link: 'https://github.com/zzy-cl/langchain-langgraph-docs-zh' }
    ],
    sidebar: [
      {
        text: '指南',
        items: [
          { text: '快速入门', link: '/guide/getting-started' },
          { text: '核心概念', link: '/guide/core-concepts' },
          { text: '基础使用', link: '/guide/basic-usage' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/zzy-cl/langchain-langgraph-docs-zh' }
    ]
  }
})
