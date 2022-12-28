# animations-timetable-v3

This template should help get you started developing with Vue 3 in Vite.

## ref()
一般用于定义简单/复杂数据类型的响应式(`Proxy`)变量，也可用于复杂数据类型
```javascript
import { ref } from 'vue'

const counter = ref(0)

// 读取和修改都需要通过.value属性
const add = () => {
    counter.value++
}

// template
<span>{{ counter }}</span>
```

### 注意
- 如果将一个对象传给`ref()`,它将会通过`reactive()`转化为深层次的响应式(`Proxy`)对象
- 避免上述情况，可以使用`shallowRef()`



## reactive
一般用于定义复杂数据类型的响应式变量，但是基本上用`ref()`就够了

```javascript
import { reactive } from 'vue'

const list = reactive(['1', '2'])
console.log(list); // Proxy {0: '1', 1: '2'} 

const objList = reactive({ realVal: [{ name: 'zss', age: 18 }] })
console.log(objList.realVal) // Proxy {0: {…}}
```

### 注意
如果存在多层的复杂数据类型需要包一层防止赋值的时候失去响应式


## 初始化带数据类型的响应式数据
加上数据类型的原因是为了解决遍历数组的子项的时候会提示 `类型“never”上不存在属性“id”。`

```javascript
type todoItemType = {
  id: number;
  content: string;
};


// 最开始直接是这么写的, 但是直接类型报错了
// 类型“Ref<never[]>”缺少类型“todoItemType[]”的以下属性: length, pop, push, concat 及其他 26 项。
const list: Array<todoItemType> = ref([])

// 然后就通过中间变量的形式去创建的
const defaultTodoList: Array<todoItemType> = [];
const todoList: Array<todoItemType> = ref(defaultTodoList)
```

## 定义`props`
借助于`defineProps`
```javascript
import { defineProps } from "vue";

// props数组的写法
// const props = defineProps(["todoInfo"]);

// props对象写法, props中的属性可以直接使用，所以不需要解构
const props = defineProps({
  todoInfo: { type: Object, default: () => ({}) },
});
```

## 使用`emit`
借助于``
```javascript
import { defineEmits } from "vue";

// emit的简易写法
// const emit = defineEmits(["delete"]);

// emit的复杂写法
const emit = defineEmits<{
  (event: "delete", id: number): void;
}>();
```


## 计算属性
```javascript
import { computed, ref } from 'vue';

// 值不会发生改变
const now = computed(() => Date.now());

// 每次点击的值都是一样的
const handleClick = () => {
    console.log(1008600, { now });
}


const list = ref([])
// 值会随着list的长度变化而变化，若未变化则直接读取缓存的值
const len = computed(() => list.length)
```