Warm UI - 基于 Vue 3 的轻量组件库
Warm UI 是一个基于 Vue 3 的轻量、可主题化的组件库，支持 TypeScript，专注于快速构建中后台前端应用。通过 Monorepo 结构组织代码，提供完善的组件测试与开发工具链。
特性
Vue 3 原生支持：基于 Vue 3 Composition API 与 TypeScript 开发，提供类型安全。
灵活主题：通过 CSS 变量与 PostCSS 实现主题定制（packages/theme）。
轻量易用：组件按需引入，支持全局安装或单组件使用。
开发友好：集成 Storybook 实时预览（pnpm story）与 VitePress 文档（pnpm docs:dev）。
测试覆盖：单元测试（Vitest）+ 浏览器测试（Playwright）保障组件质量。
安装
bash
# 使用 pnpm（推荐）
pnpm add warm-ui

# 或 npm
npm install warm-ui
快速开始
全局注册（推荐）
ts
// main.ts
import { createApp } from 'vue';
import WarmUI from 'warm-ui';
import 'warm-ui/theme/index.css'; // 引入基础样式

const app = createApp(App);
app.use(WarmUI);
app.mount('#app');
单组件使用
vue
<template>
  <WarmButton type="primary" @click="handleClick">点击我</WarmButton>
</template>

<script setup lang="ts">
import { WarmButton } from 'warm-ui';

const handleClick = () => {
  console.log('按钮被点击');
};
</script>
文档与预览
组件文档：pnpm docs:dev 启动 VitePress 文档服务（packages/docs）。
实时预览：pnpm story 启动 Storybook 组件调试（packages/play）。
