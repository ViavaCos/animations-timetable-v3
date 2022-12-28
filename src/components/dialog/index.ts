import { createApp } from "vue";
import CustomDialog from "./CustomDialog.vue";

type closeFn = (isConfirm: boolean) => void;
type options = {
  title?: string;
  hideTitle?: boolean;
  hideFooter?: boolean;
  closeDialog?: closeFn;
};

function initDialog(options = {} as options) {
  const div = document.createElement("div");
  const app = createApp(CustomDialog, {
    visible: true, // 默认显示弹窗
    ...options,
  });

  // 通过载体挂载到页面中
  app.mount(div);
  document.body.appendChild(div);

  return {
    close: () => {
      app.unmount();
      div.remove();
    },
    instance: app,
  };
}

export default initDialog;
