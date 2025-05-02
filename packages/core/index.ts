import { makeInstaller } from "@Warm-UI/utils";
import components from "./components";
import '@Warm-UI/theme/index.css'

const installer = makeInstaller(components);

// 导出 @Warm-UI/components 模块的所有命名导出（按需导入支持）
export * from "@Warm-UI/components";

// 默认导出安装器（全局安装支持）
export default installer;
