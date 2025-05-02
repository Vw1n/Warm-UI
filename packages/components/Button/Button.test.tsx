// 导入 Vitest 测试框架的核心 API（describe: 测试套件，it: 测试用例，expect: 断言）
import { describe, it, expect } from "vitest";
// 导入 Vue 测试工具的 mount 函数（用于挂载组件实例）
import { mount } from "@vue/test-utils";
// 导入被测试的目标组件（当前测试的主角：Button 按钮组件）
import Button from "./Button.vue";

// 定义一个测试套件（分组），描述当前测试的主题是 "Button.vue 组件"
describe("Button.vue", () => {

  // 测试用例 1：验证 type prop 正确应用对应的类名
  // 目标：当传入 type prop 时，组件 DOM 元素应包含 "warm-button--{type}" 格式的类
  it("should has the correct type class when type prop is set", () => {
    // 定义要测试的 type 值（主色、成功、警告、危险、信息）
    const types = ["primary", "success", "warning", "danger", "info"];
    // 遍历所有 type 值，逐个验证
    types.forEach((type) => {
      // 1. 挂载组件：通过 mount 函数创建 Button 组件实例，传递 type prop
      const wrapper = mount(Button, {
        props: { type: type as any },  // 传递当前 type 值作为 prop
      });
      // 2. 断言验证：检查组件根元素的类列表是否包含预期的类名（如 "warm-button--primary"）
      expect(wrapper.classes()).toContain(`warm-button--${type}`);
    });
  });

  // 测试用例 2：验证 size prop 正确应用对应的类名
  // 目标：当传入 size prop 时，组件 DOM 元素应包含 "warm-button--{size}" 格式的类
  it("should has the correct size class when size prop is set", () => {
    // 定义要测试的 size 值（大、默认、小）
    const sizes = ["large", "default", "small"];
    // 遍历所有 size 值，逐个验证
    sizes.forEach((size) => {
      // 挂载组件并传递 size prop
      const wrapper = mount(Button, {
        props: { size: size as any },
      });
      // 断言：类列表包含预期的 size 类（如 "warm-button--large"）
      expect(wrapper.classes()).toContain(`warm-button--${size}`);
    });
  });

  // 测试用例 3：参数化测试（批量验证多个布尔型 prop 对应的类名）
  // 目标：当传入 plain/round/circle 等布尔型 prop 为 true 时，组件应包含对应的类（如 "is-plain"）
  // it.each：Vitest 提供的参数化测试语法，自动遍历数组生成多个测试用例
  it.each([
    ["plain", "is-plain"],     // 参数1: prop 名，参数2: 预期类名
    ["round", "is-round"],
    ["circle", "is-circle"],
    ["disabled", "is-disabled"],
    ["loading", "is-loading"],
  ])(
    "should has the correct class when prop %s is set to true",  // 测试用例名称（%s 会被参数替换）
    (prop, className) => {  // 每个测试用例的执行函数（参数来自数组项）
      // 挂载组件并传递当前 prop 为 true（如 { plain: true }）
      const wrapper = mount(Button, {
        props: { [prop]: true },  // 动态设置 prop（ES6 计算属性名）
        global: {
          stubs: ["ErIcon"],  // 全局存根：忽略 ErIcon 组件（避免未注册报错）
        },
      });
      // 断言：类列表包含预期的类（如 "is-plain"）
      expect(wrapper.classes()).toContain(className);
    }
  );

  // 测试用例 4：验证 native-type prop 正确设置原生按钮的 type 属性
  // 目标：当传入 nativeType prop 时，渲染的 <button> 元素的 type 属性应与 prop 一致
  it("should has the correct native type attribute when native-type prop is set", () => {
    // 挂载组件，传递 nativeType 为 "submit"
    const wrapper = mount(Button, {
      props: { nativeType: "submit" },
    });
    // 断言 1：组件根元素是 <button> 标签（默认渲染为 button）
    expect(wrapper.element.tagName).toBe("BUTTON");
    // 断言 2：原生 button 元素的 type 属性值为 "submit"
    expect((wrapper.element as HTMLButtonElement).type).toBe("submit");
  });

  // 测试用例 5：验证 tag prop 自定义渲染标签
  // 目标：当传入 tag prop 时，组件应渲染为指定的 HTML 标签（如 <a>）
  it("should renders the custom tag when tag prop is set", () => {
    // 挂载组件，传递 tag 为 "a"（希望渲染为 <a> 标签）
    const wrapper = mount(Button, {
      props: { tag: "a" },
    });
    // 断言：根元素的标签名（转为小写）是 "a"
    expect(wrapper.element.tagName.toLowerCase()).toBe("a");
  });

  // 测试用例 6：验证点击事件触发
  // 目标：点击按钮时，组件应触发 "click" 自定义事件
  it("should emits a click event when the button is clicked", async () => {
    // 挂载组件（无额外 props）
    const wrapper = mount(Button, {});
    // 触发组件根元素的 "click" 事件（模拟用户点击）
    await wrapper.trigger("click");
    // 断言：click 事件被触发，且触发次数为 1 次
    expect(wrapper.emitted().click).toHaveLength(1);
  });
});