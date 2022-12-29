<script setup lang="ts">
import { defineProps } from "vue";

defineProps<{
  message: string;
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
}>();
</script>

<template>
  <div class="toast" :class="type">
    <span>{{ message }}</span>
  </div>
</template>

<style scoped>
.toast {
  position: fixed;
  top: 20px;
  left: 50%;
  padding: 0 20px;
  font-size: 12px;
  transition: opacity 1s;
  opacity: 1;
}
.toast.success {
  background-color: #ddffa8;
  color: #80ce0a;
}
.toast.error {
  background-color: #f6d2cd;
  color: #f52b0c;
}
.toast.info {
  background-color: #f6e2e2;
  color: #3f3f3f;
}
.toast.warning {
  background-color: #ffb85d;
  color: #ff5000;
}
</style>
