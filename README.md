# LangChain & LangGraph 中文文档

这是LangChain和LangGraph官方文档的中文本地化项目，基于VitePress构建，提供通俗易懂的中文学习资源。

## 项目结构
```
├── docs/
│   ├── .vitepress/
│   │   └── config.ts          # VitePress配置文件
│   ├── guide/
│   │   ├── getting-started.md # 快速入门章节
│   │   ├── core-concepts.md   # 核心概念章节
│   │   └── basic-usage.md     # 基础使用章节
│   └── index.md               # 首页
├── package.json
└── README.md
```

## 本地开发
### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```
访问 http://localhost:5173 查看文档

### 构建生产版本
```bash
npm run build
```

### 预览生产构建结果
```bash
npm run serve
```

## 版本说明
- VitePress版本：1.6.4（最新稳定版）
- Vue版本：3.5.x（升级原因：VitePress 1.6+需要Vue 3.3+支持`hasInjectionContext`API）
- 初始版本已完成三个核心章节：快速入门、核心概念、基础使用方法

## 部署到GitHub Pages
### 1. 创建GitHub仓库
在GitHub上创建一个名为`langchain-langgraph-docs-zh`的公开仓库

### 2. 配置Git远程地址
```bash
git remote add origin git@github.com:你的用户名/langchain-langgraph-docs-zh.git
git branch -M main
git push -u origin main
```

### 3. 配置GitHub Actions自动部署
在项目根目录创建`.github/workflows/deploy.yml`文件，内容如下：
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - name: Install dependencies
        run: npm ci
      - name: Build with VitePress
        run: npm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 4. 启用GitHub Pages
在GitHub仓库的设置页面中，找到Pages选项，将源设置为"GitHub Actions"

提交代码后，GitHub Actions会自动构建并部署文档，访问地址为：`https://你的用户名.github.io/langchain-langgraph-docs-zh/`

## 后续扩展指南
1. **完善文档内容**：继续翻译官方文档的其他章节，包括高级功能、LangGraph文档、API参考等
2. **添加更多示例**：补充更多实际应用场景的代码示例和最佳实践
3. **优化站点功能**：添加搜索功能、暗色模式切换、多版本支持等
4. **社区运营**：建立贡献指南、Issue模板，吸引更多开发者参与项目

## 常见问题
### 构建失败提示"hasInjectionContext"不存在？
这是因为Vue版本过低，升级Vue到3.3+版本即可解决：
```bash
npm install vue@latest
```
