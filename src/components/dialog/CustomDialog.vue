<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
// import type { dialogPropsType } from "./index.d";

// 定义props - 普通形式 [不能定义函数的参数及参数类型]
// defineProps({
//   visible: { type: Boolean, default: false },
//   title: { type: String, default: "" },
//   hideTitle: { type: Boolean, default: false },
//   hideFooter: { type: Boolean, default: false },
//   close: { type: Function, default: () => {} },
// });

// 定义props - ts类型形式 [不能设置默认值了]
type closeFn = (isConfirm: boolean) => void;
const props = defineProps<{
  visible: boolean;
  title?: string;
  hideTitle?: boolean;
  hideFooter?: boolean;
  closeDialog?: closeFn;
}>();

// 直接给我整报错了。。。
// [plugin:vite:vue] [@vue/compiler-sfc] type argument passed to defineProps() must be a literal type, or a reference to an interface or literal type.
// const props = defineProps<dialogPropsType>();

// 定义emit事件
const emit = defineEmits<{
  (event: "cancel"): void; // 取消
  (event: "confirm"): void; // 确定
}>();

// 取消
const handleCancel = () => {
  typeof props.closeDialog === "function" && props.closeDialog(false);
  emit("cancel");
};

// 确定
const handleConfirm = () => {
  typeof props.closeDialog === "function" && props.closeDialog(true);
  emit("confirm");
};
</script>

<template>
  <div v-if="visible" class="dialog-wrap">
    <div class="dialog">
      <div v-if="!hideTitle" class="dialog-header">{{ title }}</div>
      <div class="dialog-content">
        <slot></slot>
      </div>
      <div v-if="!hideFooter" class="dialog-footer">
        <button @click="handleCancel">取消</button>
        <button @click="handleConfirm">确定</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dialog-wrap {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.dialog-wrap::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
}
.dialog {
  width: 320px;
  height: max-content;
  background-color: #fff;
}
.dialog-header {
  height: 32px;
  line-height: 32px;
  font-size: 14px;
  padding: 0 4px;
  border-bottom: 1px solid #ccc;
}
.dialog-footer {
  padding: 4px;
  text-align: right;
}
.dialog-footer button:nth-child(n + 2) {
  margin-left: 4px;
}
</style>
