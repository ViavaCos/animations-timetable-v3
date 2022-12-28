<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

// props数组的写法
// const props = defineProps(["todoInfo"]);

// props对象写法, props中的属性可以直接使用，所以不需要解构
const props = defineProps({
  todoInfo: { type: Object, default: () => ({}) },
});

// emit的简易写法
// const emit = defineEmits(["delete"]);

// emit的复杂写法
const emit = defineEmits<{
  (event: "delete", id: number): void;
  (event: "edit", id: number): void;
}>();

/**
 * Methods
 */

// 删除
const handleDel = () => {
  emit("delete", props.todoInfo.id);
};
// 编辑
const handleEdit = () => {
  emit("edit", props.todoInfo.id);
};
</script>

<template>
  <div class="todo-item">
    <div class="content">{{ todoInfo.content }}</div>
    <div class="operation">
      <span class="operate edit" @click="handleEdit">编辑</span>
      <span class="operate del" @click="handleDel">删除</span>
    </div>
  </div>
</template>

<style scoped>
.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4px;
}
.todo-item:hover {
  background-color: #e2eef3;
}
.operate {
  user-select: none;
  cursor: pointer;
  font-size: 12px;
  color: #15a8e2;
}
.operate:nth-child(n + 2) {
  margin-left: 6px;
}
.operate:active {
  color: skyblue;
}
</style>
