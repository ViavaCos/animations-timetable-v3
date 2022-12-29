import { createApp } from "vue";
import CustomToastVue from "./CustomToast.vue";

type toastOptionsType = {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
};

// 默认配置
const defaultOptions: toastOptionsType = {
  message: "",
  type: "success",
  duration: 2000, // 持续时间默认2s
};

function initToast(options = {} as toastOptionsType) {
  options = { ...defaultOptions, ...options };

  const app = createApp(CustomToastVue, options);

  const wrap = document.createElement("div");
  wrap.className = "toast-warp";

  // dom节点挂载
  app.mount(wrap);
  document.body.appendChild(wrap);

  setTimeout(() => {
    // 自动卸载
    app.unmount;
    wrap.remove();
  }, options.duration);

  return { instance: app };
}

export default initToast;
