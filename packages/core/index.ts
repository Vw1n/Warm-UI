import { makeInstaller } from "@Warm-UI/utils";
import components from "./components";
import '@Warm-UI/theme/index.css'

const installer = makeInstaller(components);

export * from "@Warm-UI/components";
export default installer;
