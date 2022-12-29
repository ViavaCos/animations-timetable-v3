<script setup lang="ts">
// import { ref, reactive } from "vue";
import { ref, computed } from "vue";
import TodoItemVue from "@/components/TodoItem.vue";
import CustomDialog from "@/components/dialog/CustomDialog.vue";
import initDialog from "@/components/dialog";

type todoItemType = {
  id: number;
  content: string;
};
const defaultTodoList: Array<todoItemType> = [];
// const todoList = reactive({ value: defaultTodoList });
const todoList = ref(defaultTodoList);
const keyWords = ref("");
const editDialogVisible = ref(false);

const defaultEdit: todoItemType = { id: -1, content: "" };
const currentEdit = ref(defaultEdit);

// 计算属性
const todosNum = computed(() => todoList.value.length);

// Methods
// 新增
const handleAdd = () => {
  if (!keyWords.value.trim()) return alert("Cannot be empty");

  const todoItem: todoItemType = {
    id: todoList.value.length + 1,
    content: keyWords.value,
  };
  keyWords.value = ""; // empty
  todoList.value.unshift(todoItem);
};
// 删除
const handleDel = (id: number) => {
  const dialog = initDialog({
    title: "确定要删除么？删除后将无法恢复！",
    closeDialog: (isConfirm: boolean) => {
      if (isConfirm) {
        const index = todoList.value.findIndex((todo) => todo.id === id);
        if (index < 0) return alert("Cannot find current item.");

        todoList.value.splice(index, 1);
      }

      dialog.close();
    },
  });
};
// 点击编辑
const handleClickEdit = (id: number) => {
  editDialogVisible.value = true;

  const targetEdit = todoList.value.find((todo) => todo.id === id);
  if (!targetEdit) return alert("Error: cannot find edit todo!");
  // 浅拷贝，断开复杂数据的内存地址引用
  currentEdit.value = { ...targetEdit };
};
// 确定编辑
const handleConfirm = () => {
  editDialogVisible.value = false;
  const targetEdit = todoList.value.find(
    (todo) => todo.id === currentEdit.value.id
  );
  if (!targetEdit) return alert("Error: cannot find edit todo!");
  // 利用复杂数据的内存地址引用进行数据更新
  targetEdit.content = currentEdit.value.content;
};
</script>

<template>
  <div class="todo-view">
    <div class="search-header">
      <input
        type="text"
        placeholder="Enter something here that you need to do. (Enter)"
        class="search-ipt"
        v-model="keyWords"
        @keyup.enter="handleAdd"
      />
      <input class="add" type="button" value="新增" @click="handleAdd" />
    </div>

    <br />
    <template v-if="todosNum">
      <p class="todo-num">
        一共
        <span style="color: #000"> {{ todosNum }} </span>
        条数据
      </p>
      <div class="todo-list">
        <TodoItemVue
          v-for="item in todoList"
          :todoInfo="item"
          :key="item.id"
          @delete="handleDel"
          @edit="handleClickEdit"
        />
      </div>
    </template>

    <p v-else class="no-data">暂无数据</p>
  </div>

  <CustomDialog
    v-model:visible="editDialogVisible"
    title="这是标题"
    @confirm="handleConfirm"
  >
    <div class="custom-dialog-content">
      <textarea
        class="edit-textarea"
        v-model="currentEdit.content"
        cols="40"
        rows="10"
      ></textarea>
    </div>
  </CustomDialog>
</template>

<style scoped>
.todo-view {
  padding: 20px;
}
.todo-list {
  height: 520px;
  overflow-y: auto;
}
.search-header {
  display: block;
}
.no-data {
  text-align: center;
  color: #ccc;
  font-size: 14px;
}
.todo-num {
  font-size: 12px;
  text-align: right;
  color: #7a7373;
  background: antiquewhite;
  padding: 0 10px;
}
.search-ipt {
  height: 32px;
  width: 320px;
  border: 1px solid #ccc;
  outline: 0 none;
  padding: 0 4px;
}
.add {
  height: 32px;
  margin-left: 10px;
  vertical-align: middle;
  cursor: pointer;
}
.custom-dialog-content {
  padding: 0 4px;
}
.edit-textarea {
  outline: 0 none;
  resize: none;
  margin-top: 4px;
}
</style>
