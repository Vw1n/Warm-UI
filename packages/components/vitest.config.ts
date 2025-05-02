// vitest.config.ts
// Vitest 测试框架的配置文件（基于 Vite 配置），用于定义测试环境、插件及行为

// 告诉 TypeScript 编译器加载 Vitest 的类型定义（IDE 可识别 test/describe 等全局 API 的类型）
/// <reference types="vitest" />

// 导入 Vite 的 defineConfig 函数（用于定义 Vite 配置）
import { defineConfig } from "vite";
// 导入 Vue 3 官方 Vite 插件（解析 .vue 单文件组件）
import vue from "@vitejs/plugin-vue";
// 导入 Vue JSX 支持插件（解析 .jsx/.tsx 文件）
import vueJsx from "@vitejs/plugin-vue-jsx";

// 导出 Vite 配置（Vitext 会继承 Vite 配置，并扩展测试相关选项）
export default defineConfig({
  // Vite 插件列表（与项目构建时共享，确保测试环境与构建环境一致）
  plugins: [
    vue(),       // 启用 Vue 单文件组件支持（解析 .vue 文件）
    vueJsx()     // 启用 JSX 语法支持（解析 .jsx/.tsx 文件）
  ],

  // Vitest 特有的测试配置（区别于 Vite 构建配置）
  test: {
    // 启用全局测试 API：允许直接使用 describe/it/expect 等方法（无需手动 import）
    // 例如：it('测试用例', () => { ... }) 可直接编写，无需导入
    globals: true,

    // 测试运行环境：模拟浏览器环境（通过 jsdom 提供 document/window 等 API）
    // 可选值：'node'（默认，纯 Node 环境）、'happy-dom'（更快的模拟环境）等
    environment: "jsdom"
  }
});

// 配套的 package.json 测试脚本说明：
// "test": "vitest --coverage" 表示运行测试时同时生成覆盖率报告
// --coverage 参数会统计测试用例覆盖的代码行数、分支、函数等（输出到 coverage 目录）